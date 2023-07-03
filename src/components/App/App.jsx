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

   return (
      <div className="app">
         <div className="sidebar">
            <FriendsList friends={friends} />
            <FormAddFriend />
            <Button>Close</Button>
         </div>
         <FormSplitBill />
      </div>
   );
}

function FriendsList({ friends }) {
   const renderedFriends = friends.map((friend) => {
      return <Friend key={friend.id} friend={friend} />;
   });
   return <ul>{renderedFriends}</ul>;
}

function Friend({ friend }) {
   return (
      <li>
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
         <Button>Select</Button>
      </li>
   );
}

function FormAddFriend() {
   return (
      <form action="" className="form-add-friend">
         <label htmlFor="input-name">🏃 Friend name</label>
         <input type="text" name="input-image" id="input-name" />

         <label htmlFor="input-image">📷 Image URL</label>
         <input type="text" name="input-image" id="input-image" />

         <Button>Add Friend</Button>
      </form>
   );
}

function FormSplitBill() {
   return (
      <form action="" className="form-split-bill">
         <h2>Split a bill with X</h2>

         <label htmlFor="input-bill">💰 Bill Value</label>
         <input type="text" name="input-bill" id="input-bill" />

         <label htmlFor="input-expenses">💸 Your expenses</label>
         <input type="text" name="input-expenses" id="input-expenses" />

         <label htmlFor="input-friends">🫂 X's expenses</label>
         <input type="text" name="input-friends" id="input-friends" disabled={true} />

         <label htmlFor="select-payer">🤑 Who is paying the bill?</label>
         <select name="select-payer" id="select-payer">
            <option value="user">Your</option>
            <option value="firend">X</option>
         </select>
      </form>
   );
}

function Button({ children }) {
   return <button className="button">{children}</button>;
}
