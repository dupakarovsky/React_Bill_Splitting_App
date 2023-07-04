import "./App.css";
import { useState } from "react";

const initialFriends = [
   {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
   },
   {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
   },
   {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
   },
];

export default function App() {
   const [friends, setFriends] = useState(initialFriends);
   const [selectedFriend, setSelectedFriend] = useState(null);
   const [showAddFriend, setShowAddFriend] = useState(false);

   const handleAddFriend = (name, url) => {
      const nextId = Math.floor(Math.random() * 1000000);
      const updateFriends = [...friends, { id: nextId, name: name, image: url, balance: 0 }];
      setFriends(updateFriends);
      setShowAddFriend(false);
   };

   const handleToggleAddFriend = () => {
      setShowAddFriend(!showAddFriend);
   };

   const handleSelectedFriend = (friend) => {
      setSelectedFriend((currSelected) => (currSelected?.id === friend.id ? null : friend));
      setShowAddFriend(false);
   };

   const handleBalanceUpdate = (newBalance) => {
      const updatedFriends = friends.map((friend) => {
         if (friend.id === selectedFriend.id)
            return {
               ...friend,
               balance: newBalance,
            };
         return friend;
      });
      setFriends((currFriends) => updatedFriends);
      setSelectedFriend(null);
   };

   return (
      <div className="app">
         <div className="sidebar">
            <FriendsList friends={friends} onSelect={handleSelectedFriend} selectedFriend={selectedFriend} />
            {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
            <Button onButtonClick={handleToggleAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
         </div>
         {selectedFriend && (
            <FormSplitBill
               key={selectedFriend.id}
               selectedFriend={selectedFriend}
               onBalanceUpdate={handleBalanceUpdate}
            />
         )}
      </div>
   );
}

function FriendsList({ friends, onSelect, selectedFriend }) {
   const renderedFriends = friends.map((friend) => {
      return <Friend key={friend.id} friend={friend} onSelect={onSelect} selectedFriend={selectedFriend} />;
   });
   return <ul>{renderedFriends}</ul>;
}

function Friend({ friend, onSelect, selectedFriend }) {
   const isSelectd = selectedFriend?.id === friend.id;

   return (
      <li className={isSelectd ? "selected" : ""}>
         <img src={friend.image} alt={friend.name} />
         <h3>{friend.name}</h3>
         {friend.balance < 0 && (
            <p className="red">
               You owe {friend.name} a total of ${Math.abs(friend.balance)}
            </p>
         )}
         {friend.balance === 0 && <p>You and {friend.name} are even</p>}
         {friend.balance > 0 && (
            <p className="green">
               {friend.name} owes you a total of ${friend.balance}
            </p>
         )}
         <Button onButtonClick={() => onSelect(friend)}>{isSelectd ? "Close" : "Select"}</Button>
      </li>
   );
}

function FormAddFriend({ onAddFriend }) {
   const [name, setName] = useState("");
   const [imageURL, setImageURL] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!name) return;
      onAddFriend(name, imageURL);
      setName((currName) => "");
      setImageURL((currImage) => "");
   };

   return (
      <form action="" className="form-add-friend" onSubmit={handleSubmit}>
         <label htmlFor="input-name">🏃 Friend name</label>
         <input type="text" name="input-image" id="input-name" value={name} onChange={(e) => setName(e.target.value)} />

         <label htmlFor="input-image">📷 Image URL</label>
         <input
            type="text"
            name="input-image"
            id="input-image"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
         />
         <Button>Add Friend</Button>
      </form>
   );
}

function FormSplitBill({ selectedFriend, onBalanceUpdate }) {
   const [payerSelect, setPayerSelect] = useState("you");
   const [billInput, setBillInput] = useState("");
   const [yourInput, setYourInput] = useState("");

   const friendInput = billInput ? billInput - yourInput : "";

   const handleBillInputChange = (e) => {
      setBillInput(Number(e.target.value));
   };

   const handleBillInputBlur = () => {
      if (billInput < yourInput) setYourInput(billInput);
   };

   const handleYourInputChange = (e) => {
      setYourInput(
         billInput < Number(e.target.value) ? (currYourInput) => billInput : (currYourInput) => Number(e.target.value)
      );
   };

   const handlePayerSelectChange = (e) => {
      setPayerSelect(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!billInput ?? !friendInput) return;

      const sign = payerSelect === "you" ? 1 : -1;
      let newBalance = selectedFriend.balance + friendInput * sign;
      onBalanceUpdate(newBalance);
   };

   return (
      <form action="" className="form-split-bill" onSubmit={handleSubmit}>
         <h2>Split a bill with {selectedFriend && selectedFriend.name}</h2>

         <label htmlFor="input-bill">💰 Bill Value</label>
         <input
            type="number"
            name="input-bill"
            id="input-bill"
            min={0}
            value={billInput}
            onChange={handleBillInputChange}
            onBlur={handleBillInputBlur}
         />

         <label htmlFor="input-expenses">💸 Your expenses</label>
         <input
            type="number"
            name="input-expenses"
            id="input-expenses"
            min={0}
            max={billInput}
            value={yourInput}
            onChange={handleYourInputChange}
         />

         <label htmlFor="input-friend">🫂 {selectedFriend ? selectedFriend.name : "Friend"}'s expenses</label>
         <input
            type="text"
            name="input-friend"
            id="input-friend"
            min={0}
            max={billInput}
            value={friendInput}
            disabled={true}
         />

         <label htmlFor="select-payerInput">🤑 Who is paying the bill?</label>
         <select name="select-payerInput" id="select-payerInput" value={payerSelect} onChange={handlePayerSelectChange}>
            <option value="you">You</option>
            {selectedFriend && <option value="friend">{selectedFriend.name}</option>}
         </select>
         <Button>Split Bill</Button>
      </form>
   );
}

function Button({ children, onButtonClick }) {
   return (
      <button className="button" onClick={onButtonClick}>
         {children}
      </button>
   );
}
