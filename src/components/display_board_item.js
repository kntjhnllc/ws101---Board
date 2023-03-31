import { useState, useEffect } from "react";
import { userData } from "@/data_store/data";
import Link from "next/link";
import { useRouter } from "next/router";
import AddCard from "./add_card";
import DisplayCard from "./display_card";

export default function DisplayBoardItem() {
    const { user } = userData();
    const { asPath } = useRouter();

    const [event, setEvent] = useState({
        isAddCard: false,
        index: -1,
    });

    const addCard = (e) => {
        setEvent({ ...event, isAddCard: true,index:e});
    }
    
    return (
        <>
            {user.map((boards) => {
                if (boards.isLoggedIn) {
                    return boards.data.map((data, i) => {
                        if (i == asPath.split('/').at(1)) {
                            return data.items.map((item, i) => {
                                return (
                                    <div key={item.item + i} className="max-w-[400px] flex flex-col gap-4 border border-gray-200 p-4 rounded-md ">
                                        <h1 className="font-bold text-lg">{item.item}</h1>

                                        <DisplayCard itemIndex={i}/>


                                        {event.isAddCard && event.index === i ? <AddCard event={event} setEvent={setEvent} /> : <div className="text-slate-500 mt-3 cursor-pointer" onClick={()=>{addCard(i);}}><span className="text-2xl">+</span> Add Card</div>}

                                    </div>)
                            })
                        }
                    })
                }
            })
            }
        </>
    );



}