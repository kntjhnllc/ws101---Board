import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AddBoardItem from "@/components/add_board_item";
import DisplayBoardItem from "@/components/display_board_item";
import Navbar from "@/components/navbar";
import { userData } from "@/data_store/data";

const Board = () => {
  const router = useRouter();
  const { asPath } = router;
  const [event, setEvent] = useState({
    isAddBoard: false,
  });

  const { user } = userData();

  const addBoardItem = () => {
    setEvent({ ...event, isAddBoard: true });
  };

  useEffect(() => {
    const isLogged = user.some((obj) => obj.isLoggedIn);

    if (!isLogged) {
      router.push("/login");
    }
  }, []);

  const view = () => {
    console.log(user);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="mt-10">
          {user.map((boards) =>
            boards.isLoggedIn &&
            boards.data.map((data, i) =>
              i == asPath.split("/").at(1) && (
                <div key={data.title + i}>
                  <h1
                    className="text-2xl font-bold"
                    onClick={view}
                  >
                    {data.title !== ""
                      ? data.title
                      : "Title"}
                  </h1>
                  <h4 className="text-lg font-normal text-slate-500">
                    {data.description !== ""
                      ? data.description
                      : "Description"}
                  </h4>
                </div>
              )
            )
          )}

          <div className="grid grid-cols-3 gap-3 my-5 ">
            <DisplayBoardItem />

            {event.isAddBoard ? (
              <AddBoardItem event={event} setEvent={setEvent} />
            ) : (
              <div
                className="max-w-[400px] flex flex-col gap-4 border border-gray-200 p-4 rounded-md cursor-pointer"
                onClick={addBoardItem}
              >
                <div className="text-5xl mx-auto text-gray-500">+</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
