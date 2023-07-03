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
         </div>
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
         <button className="button">Select</button>
      </li>
   );
}
