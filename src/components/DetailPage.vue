<template>
  <div>
    <h4>번호 : {{ $route.params.code }}</h4>
    <h4>제목 : {{ $route.params.title }}</h4>
    <h5>내용 : {{ $route.params.content }}</h5>
    <h5>내용2 : {{ $route.params.contentt }}</h5>
    <h5>내용3 : {{ $route.params.contenttt }}</h5>
    <h5>작성일 : {{ $route.params.writeDate.substring(0, 10) }}</h5>
    <h5>작성자 : {{ $route.params.writer }}</h5>
    <h5>추천수 : {{ $route.params.up }}</h5>
    <button @click="thumbsUpBtn()">추천</button>
    <button @click="deleteBtn()">삭제</button>
    <button @click="listBtn()">목록</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetailPage",
  data() {
    return {
      // delete: this.$route.params.delete
    };
  },
  props: {
    postData: Array,
  },
  methods: {
    deleteBtn() {
      var deleteData = {
        user: localStorage.getItem("userid"),
        code: this.$route.params.code,
      };
      console.log("deleteBtn");
      axios.post("api/board/postdelete", deleteData)
      .then((result) => {
        if (result.data == "err") {
          console.log("fail");
        } else {
          console.log(deleteData.user)
          console.log(this.$route.params.code)
          this.$router.push("/list");
        }
      });
    },
    listBtn() {
      this.$router.push("/list");
    },
    thumbsUpBtn() {
      var updateData = {
        code: this.$route.params.code,
      };
      console.log(updateData.code)
      axios.post("api/board/postupdate", updateData)
      .then((result) => {
        if(result.data == "err") {
          console.log("fail")
        } else {
          this.$router.push('/list')
        }
      })
      // this.$route.params.up++
      // console.log(this.$route.params.up)
    },
  },
};
</script>

<style>
</style>