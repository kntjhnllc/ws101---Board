import { useState } from "react";
import { userData } from "@/data_store/data";
import boardItemModel from "@/model/boardItemModel";
import { useRouter } from "next/router";

export default function AddBoardItem({ event, setEvent }) {
  const { asPath } = useRouter(); 
  const { user, addBoardItem } = userData();
  const [item, setItem] = useState(boardItemModel);

  const handleBoardItem = (e) => {
    setItem((prevItem) => ({ ...prevItem, [e.target.name]: e.target.value }));
  };

  const addBItem = () => {
    const userLoggedInIndex = user.findIndex((obj) => obj.isLoggedIn);
    if (userLoggedInIndex >= 0 && item.title !== "") {
      addBoardItem(userLoggedInIndex, asPath.split("/")[1], item);
      setItem(boardItemModel);
      setEvent({ ...event, isAddBoard: false });
    }
  };

  const cancel = () => {
    setEvent({ ...event, isAddBoard: false });
  };

  return (
    <div className="max-w-[400px] flex flex-col gap-4 border border-gray-200 p-4 rounded-md">
      <div>
        <input
          name="title"
          className="shadow pb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={item.title}
          onChange={handleBoardItem}
          placeholder="Board Item Title"
          required
        />
      </div>
      <div className="text-center">
        <button
          className="shadow pb-2 appearance-none border rounded py-2 px-3 border-pink-600 text-bold text-pink-600 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline mr-1 w-5/12"
          onClick={cancel}
        >
          Cancel
        </button>
        <button
          className="shadow pb-2 appearance-none border rounded py-2 px-3 border-pink-600 text-bold text-white bg-pink-600 leading-tight focus:outline-none focus:shadow-outline ml-1 w-5/12"
          onClick={addBItem}
        >
          Add
        </button>
      </div>
    </div>
  );
}