import React from "react";
import 'pinecone-router';
import "alpinejs";

export default function Feed(props) {
  const { skits, user } = props;
  window.app = function () {
  let PostList = skits.map((skit) => {
    return {
      name: `${skit.user.firstName} ${skit.user.lastName}`,
      username: `@${skit.user.username}`,
      content: `${skit.content ? skit.content : skit.parent.content}`,
      reposts: skit.reposts,
      likes: skit.likes,
      date: skit.timestamp,
      skit_images: [],
      hasBeenLiked: false,
      hasBeenReposted: false,
    };
  });
    return {
      MAX_SKIT_LENGTH: 300,
      MONTH_NAMES: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      contentText: "",
      images: [],

      skits: PostList,

      followersSuggestions: [
        {
          name: "ABC Name",
          username: "@hello_abc",
        },
        {
          name: "CDE Name",
          username: "@hello_cde",
        },
        {
          name: "XYZ Name",
          username: "@hello_xyz",
        },
      ],

      followings: [
        {
          name: "PQR Name",
          username: "@hello_pqr",
        },
        {
          name: "LMNO Name",
          username: "@hello_lmno",
        },
      ],

      follow(username) {
        let getIndexOfSuggestion = this.followersSuggestions.findIndex(
          (f) => f.username === username
        );
        this.followings.push(this.followersSuggestions[getIndexOfSuggestion]);

        // remove from Followers Suggestions array
        this.followersSuggestions.splice(getIndexOfSuggestion, 1);
      },

      unfollow(username) {
        let getIndexOfFollower = this.followings.findIndex(
          (f) => f.username === username
        );
        this.followersSuggestions.push(this.followings[getIndexOfFollower]);

        // remove from followings array
        this.followings.splice(getIndexOfFollower, 1);
      },

      saveSkit() {
        this.skits.unshift({
          name: `${user.firstName} ${user.lastName}`,
          username: `@${user.username}`,
          content: this.contentText,
          reposts: 0,
          likes: 0,
          date: new Date(),
          skit_images: this.images,
          hasBeenLiked: false,
          hasBeenReposted: false,
        });

        this.images = [];
        this.contentText = "";
      },

      repost(index) {
        this.skits[index].hasBeenReposted
          ? this.skits[index].reposts--
          : this.skits[index].reposts++;
        this.skits[index].hasBeenReposted = !this.skits[index].hasBeenReposted;
      },

      likeSkit(index) {
        this.skits[index].hasBeenLiked
          ? this.skits[index].likes--
          : this.skits[index].likes++;
        this.skits[index].hasBeenLiked = !this.skits[index].hasBeenLiked;
      },

      charactersRemaining() {
        return this.MAX_SKIT_LENGTH - this.contentText.length;
      },

      skitIsOutOfRange() {
        return (
          this.MAX_SKIT_LENGTH - this.contentText.length ===
            this.MAX_SKIT_LENGTH ||
          this.MAX_SKIT_LENGTH - this.contentText.length < 0
        );
      },

      generateAvatarFromName(name) {
        return (
          name.split(" ")[0].slice(0, 1) + "" + name.split(" ")[1].slice(0, 1)
        );
      },

      formatDate(date) {
        if (!date) {
          return null;
        }

        // const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
        const today = new Date();
        // const yesterday = new Date(today - DAY_IN_MS);
        const d = new Date(date);
        const day = d.getDate();
        const month = this.MONTH_NAMES[d.getMonth()];

        const seconds = Math.round((today - d) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);

        const isToday = today.toDateString() === d.toDateString();
        // const isYesterday = yesterday.toDateString() === date.toDateString();
        // const isThisYear = today.getFullYear() === date.getFullYear();

        if (isToday) {
          if (seconds < 5) {
            return "now";
          } else if (seconds < 60) {
            return `${seconds}s`;
          } else if (minutes < 60) {
            return `${minutes}m`;
          } else {
            return `${hours}h`;
          }
        } else {
          return month + " " + day;
        }
      },
    };
  };

  const alpineTemplate = `<div class="px-0" x-data="app()">
<div class="bg-dark rounded-lg shadow p-6 mb-8 post-home-create">
    <div class="flex w-full">
        <div class="flex-shrink-0 mr-5">
            <div class="cursor-pointer font-bold w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                <span x-text="generateAvatarFromName('${user.firstName} ${user.lastName}')" class="uppercase text-gray-700"></span>
            </div>
        </div>
        <div class="flex-1">
            <textarea x-model="contentText" 
                class="mb-2 bg-gray-100 dark:bg-gray-700 focus:shadow-outline focus:bg-gray-200 dark:focus:bg-gray-900 border border-transparent rounded-lg py-2
                 px-4 block w-full appearance-none leading-normal placeholder-gray-700 dark:placeholder-slate-200" 
                :class="{'border border-red-500': skitIsOutOfRange() && contentText.length != 0 }"
                rows="3"
                placeholder="What's happening..."></textarea>

                <div class="relative w-auto mb-2 border rounded-lg bg-green-100 shadow-inset overflow-hidden" x-show="images.length > 0">
                    <div class="gg-container">
                        <div class="gg-box square-gallery" style="margin: 0">
                            <template x-for="image in images">
                                <img class="object-cover w-full" :src="image" />
                            </template>
                        </div>
                    </div>
                    <div @click="images = []; document.getElementById('fileInput').value = ''" class="shadow cursor-pointer absolute top-0 right-0 p-2 mr-2 mt-2 rounded-full bg-gray-600">
                        <svg class="h-6 w-6 text-gray-100"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>								  
                    </div>
                </div>

                <input multiple name="photo" id="fileInput" accept="image/*" class="hidden" type="file" @change="let files = document.getElementById('fileInput').files; 
                    for (var i = 0; i < files.length; i++) {
                            var reader = new FileReader();
                            reader.onload = (e) => images.push(e.target.result);
                            reader.readAsDataURL(files[i]);
                    }
                ">
                
                <div class="flex justify-between items-center">
                    <div>
                        <label 
                            for="fileInput"
                            type="button"
                            class="-ml-2 cursor-pointer inine-flex justify-between items-center focus:outline-none p-2 
                            rounded-full text-gray-500 bg-white dark:bg-dark hover:bg-gray-200 dark:hover:bg-gray-900"
                        >
                            <svg class="h-6 w-6 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>  
                        </label>
                    </div>
                    <div>
                        <span :class="{ 'text-red-600': charactersRemaining() <= 20 && charactersRemaining() > 10, 'text-red-400': charactersRemaining() <= 10 }" class="mr-3 text-sm text-gray-600" x-text="charactersRemaining()"></span>

                        <button
                            @click="saveSkit()"
                            :disabled="(contentText == '') || skitIsOutOfRange()"
                            :class="{'cursor-not-allowed opacity-50': (contentText == '') || skitIsOutOfRange()}"
                            type="button"
                            class="w-32 focus:outline-none border border-transparent py-2 px-5 rounded-lg shadow text-center text-white bg-green-500 hover:bg-green-600 font-medium" 
                        >Post</button>
                    </div>
                </div>
        </div>
    </div>

</div>

<ul class="rounded-lg shadow mb-8 bg-dark">
    <template x-for="(skit, skitIndex) in skits" :key="skitIndex">	
        <article class="skitte-post bg-transparent">
            <li class="px-3 py-5 cursor-pointer" :class="{'border-b border-gray-200 hover:border-green-400': (skitIndex + 1) != skits.length }">
                <div class="flex flex-col w-full">
                <div class="flex flex-shrink-0">
                <div class="cursor-pointer font-bold p-5 w-12 h-12 bg-gray-300 flex items-center justify-center rounded-full">
                    <span x-text="generateAvatarFromName(skit.name)" class="uppercase text-gray-700"></span>
                </div>
            <div class="ml-3 flex items-center justify-between w-full">
                <div class="flex">
                    <strong class="font-bold text-gray-400 mr-2" x-text="skit.name"></strong> 
                    <a x-bind:href="'/' + skit.username"><span x-text="skit.username" class="text-gray-600"></span></a>
                    <span class="mx-1 text-gray-500">•</span>
                    <span class="text-gray-600" x-text="formatDate(skit.date)"></span>
                  </div>
                  <div class="ml-1 cursor-pointer relative dark:hover:bg-gray-900 inline-flex px-2 py-0 rounded-full duration-200 transition-all ease-in-out" x-data="{ openMore: false }">
                  <svg @click="openMore = !openMore" aria-label="More options" class="h-6 w-6 text-green-500 stroke-current" color="#262626" fill="#262626" role="img" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6" cy="12" r="1.5"></circle>
                    <circle cx="18" cy="12" r="1.5"></circle>
                  </svg>
                  <div x-show.transition="openMore" @click.away="openMore = false" class="absolute top-0 
                  hover:shadow dark:hover:shadow-none mt-8 right-0 w-48 dark:bg-gray-700 bg-gray-100 dark:border-none py-2 border-green-200 rounded-lg z-40" style="display: none;">
                  <a href="#" class="block px-4 py-2 text-gray-400 dark:text-gray-200 border-b 
                  border-gray-200 dark:border-gray-600 hover:border-green-300 horder:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Edit</a>
                  <a href="#" class="block px-4 py-2 text-red-400 
                  hover:shadow dark:hover:shadow-none hover:text-red-500 dark:hover:text-red-400 dark:text-red-200 border-b
                   border-gray-200 horder:bg-gray-300 dark:border-gray-600 hover:border-green-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                  Delete</a>
                </div>
                  </div>
                </div>
                </div>
                    <div class="flex-1">
                        <div class="mb-4 mt-2">
                            <p x-text="skit.content" class="ml-10 pl-5 dark:text-gray-300 text-gray-600"></p>
                        </div>
                         
                        <div class="relative w-auto mb-2 border rounded-lg bg-green-100 shadow-inset overflow-hidden" x-show="skit.skit_images.length > 0">

                            <div class="gg-container">
                                <div class="gg-box square-gallery" style="margin: 0">
                                    <template x-for="image in skit.skit_images"> 
                                        <img class="object-cover w-full" :src="image" />	 
                                    </template>
                                </div>
                            </div>
                        </div>

                        <div class="flex ml-10 items-center w-full">

                        <div class="w-1/4 flex items-center">
                            <div @click="likeSkit(skitIndex)" class="cursor-pointer hover:bg-red-200 inline-flex p-2 rounded-full duration-200 transition-all ease-in-out">
                            <svg aria-label="Liked" x-show="skit.hasBeenLiked == false" fill="none" viewBox="0 0 48 48" title="Like" class="w-5 h-5 hover:fill-red-400 fill-red-600">
                            <title>Like</title>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                            </svg>

                                <svg aria-label="Disliked" x-show="skit.hasBeenLiked == true" fill="#262626" viewBox="0 0 48 48" title="Disliked" role="img" class="w-5 h-5 fill-red-600">
                                <title>Unlike</title>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                </svg>
                            </div>
                            <div x-text="skit.likes" class="ml-1 leading-none inline-flex" :class="{'text-gray-600 pointer-events-none': skit.hasBeenLiked == false, 'text-red-400': skit.hasBeenLiked == true}"></div>
                        </div>
                        
                        <div class="w-1/4 flex items-center">
                            <div @click="repost(skitIndex, skit.reposts)" class="cursor-pointer hover:bg-green-200 inline-flex p-2 rounded-full duration-200 transition-all ease-in-out">	
                                <svg viewBox="0 0 24 24" title="Repost" fill="#4caf50" stroke="none" role="img" class="h-6 w-6" :class="{'text-gray-500': skit.hasBeenReposted == false, 'text-green-500': skit.hasBeenReposted == true }">
                                <g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g>
                                </svg>												  
                            </div>
                            <div x-text="skit.reposts" class="ml-1 leading-none inline-flex" :class="{'text-gray-600 pointer-events-none': skit.hasBeenReposted == false, 'text-green-400': skit.hasBeenReposted == true}"></div>
                        </div>
                        
                            <div class="w-1/4 flex items-center">
                                <div class="cursor-pointer dark:hover:bg-blue-200 inline-flex p-2 rounded-full duration-200 transition-all ease-in-out">
                                <svg aria-label="Comment" class="h-5 w-5 text-gray-500" stroke="currentColor" fill="none" role="img" viewBox="0 0 24 24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                </svg>												  
                                </div>
                            </div>


                            <div class="w-1/4 flex items-center">
                                <div class="cursor-pointer dark:hover:bg-gray-900 inline-flex p-2 rounded-full duration-200 transition-all ease-in-out">
                                    <svg class="h-5 w-5 text-gray-500"  fill="none" role="img" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                    </svg>
                            </div>
                        </div>	
                        </div>
                    </div>
                </div>
            </li>
        </article>
    </template>
</ul>
</div>`;

  const AlpineWidget = () => (
    <div dangerouslySetInnerHTML={{ __html: alpineTemplate }} />
  );

  return <AlpineWidget />;
}
