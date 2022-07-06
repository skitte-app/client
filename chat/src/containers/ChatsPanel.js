import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SearchIcon } from "../icons/skt-search-icon.svg";
import * as messageActions from "../store/actions/message";
import Contact from "../components/Contact";

function ChatsPanel(props) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  var token = state.auth.token;
  var username = state.auth.username;
  console.log(state.auth);

  let activeChats = state.message.chats.map((c) => {
    return (
      <Contact
        key={c.id}
        name={c.title}
        timestamp={c.timestamp}
        picURL={c.image}
        status="busy"
        chatURL={`/${c.id}`}
      />
    );
  });

  useEffect(() => {
    setTimeout(function () {
      if (token !== null && username !== undefined) {
        dispatch(messageActions.getUserChats(username, token));
      }
    }, 5000);
  }, [dispatch, token, username]);


  return (
    <div class="w-60 h-screen bg-gray-100">
      <div class="text-xl p-3">Chats</div>

      {/* <!-- CHAT SEARCH --> */}
      <div class="p-3 flex">
        <input
          class="
              p-2
              w-10/12
              bg-gray-200
              text-xs
              focus:outline-none
              rounded-tl-md rounded-bl-md
            "
          type="text"
          name="chat-search"
          id="chat-search"
          placeholder="Search for messages or users ..."
        />
        <div
          class="
              w-2/12
              flex
              justify-center
              items-center
              bg-gray-200
              rounded-tr-md rounded-br-md
            "
        >
          <SearchIcon className="w-4" />
        </div>
      </div>

      {/* <!-- CHAT STORIES --> */}
      <div class="flex m-3 overflow-x-auto">
        <div class="p-2 flex justify-center items-center flex-col">
          <img
            class="w-8 h-8 border p-1 border-blue-200 rounded-full"
            src="http://localhost:8000/sktmedia/profile-image-placeholder.png"
            alt=""
          />
          <div class="flex justify-center items-center w-3 h-3 relative left-3 bottom-3 bg-white rounded-full">
            <div class="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <div class="text-gray-500 text-xs pt-1 text-center">William</div>
        </div>
        <div class="p-2 flex justify-center items-center flex-col">
          <img
            class="w-8 h-8 rounded-full"
            src="http://localhost:8000/sktmedia/profile-image-placeholder.png"
            alt=""
          />
          <div class="text-gray-500 text-xs pt-4 text-center">David</div>
        </div>
      </div>

      {/* <!-- CHAT USER --> */}
      <div id="chat_users" class="overflow-y-auto">
        <div className="user w-60" style={{ height: "60vh" }}>
          {activeChats}

          <div class="cursor-pointer">
            <div
              class="
                flex
                m-3
                hover:bg-gray-200 hover:p-0
                bg-white
                rounded-lg
                p-2
              "
            >
              <div>
                <img
                  class="w-14 h-14 rounded-full"
                  src="http://localhost:8000/sktmedia/profile-image-placeholder.png"
                  alt=""
                />
                <div class="flex justify-center items-center ml-7 left-3 w-3 h-3 relative left-3 bottom-3 bg-white rounded-full">
                  <div class="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <div class="flex-grow p-3">
                <div class="flex text-xs justify-between">
                  <div>Divine</div>
                  <div class="text-gray-400">12:34 AM</div>
                </div>
                <div class="text-xs text-gray-400">Ok Cool, Where you from</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatsPanel