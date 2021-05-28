//import { Profiler } from "react"
//import * as React from 'react'

function removeDead (posts) {
  return posts.filter(({ dead }) => dead !== true)
}

function removeDeleted (posts) {
  return posts.filter(({ deleted }) => deleted !== true)
}

function onlyComments (posts) {
  return posts.filter(({ type }) => type === 'comment')
}

function onlyPosts (posts) {
  return posts.filter(({ type }) => type === 'story')
}

export function fetchUser (by) {
  return fetch(`https://hacker-news.firebaseio.com/v0/user/${by}.json?print=pretty`)
    .then((res)=> res.json())
    .then(posts => {
      if(!posts){
        throw new Error(` Issue in fetching the post by ${by}`)
      }
      console.log('fetchUser nia',posts);
      return posts
    })
}
export const getUserPost = (idList) => {
  return Promise.all(idList.map(getPost))
  .then(posts => removeDeleted(onlyPosts(removeDead(posts))))
}
export const getPost = (id) => {
  return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then((res)=> res.json())
}

export const getComments = (idList) => {
  console.log('inside getComments')
  console.log(idList)
  return Promise.all(idList.map(getPost))
  .then(posts => removeDeleted(onlyComments(removeDead(posts))))
}
export function fetchData (type){
  const pathUrl = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${type}stories.json?print=pretty`)

  return fetch(pathUrl)
    .then((res) => res.json())
    .then(ids => {
      if(!ids){
        throw new Error(`There was an error fetching the ${storyType} posts.`);
      }
      return ids.slice(0,40)
    })
    .then (ids => Promise.all(ids.map(getPost)))
    .then((posts)=> {
      removeDeleted(onlyPosts(removeDead(posts)))
      return posts
    })
}