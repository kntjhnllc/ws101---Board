import { useState } from "react";
import { userData } from "@/data_store/data";
import { useRouter } from "next/router";

export default function DisplayCard({ itemIndex }) {
  const { user } = userData();
  const { asPath } = useRouter();
  const [isAddingCard, setIsAddingCard] = useState(false);

  const addItem = (itemIndex) => {
    setIsAddingCard(itemIndex);
  };

  return (
    <>
      {user.map((boards) => {
        if (boards.isLoggedIn) {
          return boards.data.map((data, i) => {
            if (i == asPath.split("/").at(1)) {
              return data.items.map((item, i) => {
                if (i === itemIndex) {
                  return (
                    <div >
                       <div key={itemIndex} className="max-w-[400px] flex flex-col gap-4 border border-gray-200 p-4 rounded-md">
                      {item.cards.map((card, j) => (
                        <div key={j} className="max-w-[400px] flex flex-col gap-4 border border-gray-200 p-4 rounded-md">
                          <h1 className="font-bold text-lg">{card.title}</h1>
                          <p className="font-normal text-gray-500">{card.description}</p>
                        </div>
                      ))}
                      {isAddingCard === itemIndex ? (
                        <AddCard setIsAddingCard={setIsAddingCard} itemIndex={itemIndex} />
                      ) : (
                        <div className="text-slate-500 mt-3 cursor-pointer" onClick={() => addItem(itemIndex)}>
                          <span className="text-2xl">+</span> Add Card
                        </div>
                      )}
                    </div>
                    </div>
                  );
                }
              });
            }
          });
        }
      })}
    </>
  );
}

function AddCard({ setIsAddingCard, itemIndex }) {
  const { user, saveData } = userData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    user.forEach((board) => {
      if (board.isLoggedIn) {
        board.data.forEach((data, i) => {
          if (i == itemIndex) {
            data.items[i].cards.push({ title, description });
          }
        });
      }
    });

    saveData(user);
    setIsAddingCard(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <button type="submit">Add Card</button>
    </form>
  );
}
