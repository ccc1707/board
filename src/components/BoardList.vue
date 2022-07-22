<template>
    <div>
      <h1>{{userName}}님 반갑습니다.</h1>
      <p>{{userAuth}}입니다</p>
      <button @click="logoutBtn()">로그아웃</button>
        <table>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>내용2</th>
            <th>내용3</th>
            <th>작성일</th>
            <th>작성자</th>
            <th>관리자 조회수</th>
            <th>일반인 조회수</th>
            <th>추천수</th>
          </tr>
            <tr @click="detail(i)" v-for="(post,i) in postData" :key=i>
                <td>{{ post.POST_CODE }}</td>
                <td>{{ post.POST_TITLE }}</td>
                <td>{{ post.POST_CONTENT }}</td>
                <td>{{ post.POST_CONTENTT }}</td>
                <td>{{ post.POST_CONTENTTT }}</td>
                <td>{{ post.POST_DATE.substring(0,10)}}</td>
                <td>{{ post.USER_NAME }}</td>
                <td>{{ post.POST_MANAGER_VIEW }}</td>
                <td>{{ post.POST_GENERAL_VIEW }}</td>
                <td>{{ post.POST_VOTE }}</td>
            </tr>
        </table>
    </div>
    <button @click="writeBtn()">작성</button>
</template>

<script>

import DetailPage from './DetailPage.vue'
import BoardWrite from './BoardWrite.vue'
import LoginPage from './LoginPage.vue'

import axios from 'axios';
export default {
    name: 'BoardList',
    data() {
        return {
            postData: null,
            userName: null,
            userAuth: null
        }
    },
    component: {
      BoardWrite,
      DetailPage,
      LoginPage
    },
    created() {
      this.getPost();
      this.userName = localStorage.getItem("username")
      var user = localStorage.getItem("admin");
      user = JSON.parse(user);
      if(user == false) {
        this.userAuth = "일반인"
      } else {
        this.userAuth = "관리자"
      }
    },
    methods: {
      getPost() {
        // console.log("getPost");
        axios.get('api/board/getpost')
        .then((result) => {
          if(result.data == 'err') {
            console.log("fail")
          } else {
            this.postData = result.data
          }
        })

      },
      writeBtn() {
        this.$router.push('/write')
      },
      detail(i) {
        var viewData = {
          code: this.postData[i].POST_CODE,
          userAuth : this.userAuth
        }
        console.log(this.postData[i].POST_CODE)
        axios.post('api/board/postview', viewData)
        .then((result) => {
          if(result.data == 'err') {
            console.log("fail")
          } else {
            console.log("Hi")
          }
        })
        console.log(this.postData[i].POST_TITLE)
        this.$router.push({
          name: 'DetailPage',
          params: {
            code: this.postData[i].POST_CODE,
            title: this.postData[i].POST_TITLE,
            content: this.postData[i].POST_CONTENT,
            contentt: this.postData[i].POST_CONTENTT,
            contenttt: this.postData[i].POST_CONTENTTT,
            writeDate: this.postData[i].POST_DATE,
            writer: this.postData[i].USER_NAME,
            user: this.postData[i].USER_ID,
            up: this.postData[i].POST_VOTE,
            manager: this.postData[i].POST_MANAGER_VIEW,
            general: this.postData[i].POST_GENERAL_VIEW,
          }
          })
      },
      logoutBtn() {
        // JSON.parse(localStorage.removeItem("localLogin"))
        this.$router.push('/')

      }
    }
}
</script>