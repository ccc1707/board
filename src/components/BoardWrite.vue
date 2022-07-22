<template>
  <div>
    <div class="container">
        <h2>제목 : <input v-model= "title" type= "text"></h2>
        <h2>내용 : </h2>
        <textarea v-model="content"></textarea><br>
        <h2>내용2 : </h2>
        <textarea v-model="contentt"></textarea><br>
        <h2>내용3 : </h2>
        <textarea v-model="contenttt"></textarea><br>
        <button @click="submitBtn()">누르기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'BoardWrite',
    data() {
        return {
            title: "",
            content: "",
            contentt: "",
            contenttt: "",
        }
    },
    methods: {
      submitBtn() {
        var writeData = {
          user : localStorage.getItem('userid'),
          title : this.title,
          content : this.content,
          contentt : this.contentt,
          contenttt : this.contenttt
        }
        console.log(writeData.user)
        axios.post('api/board/postwrite', writeData)
        .then((result) => {
          if(result.data == 'err') {
            console.log("fail")
          } else {
            this.$router.push('/list')
          }
        })
      },
    }
}
</script>