<template>
  <div>
    <h1 class="title">Главная</h1>
    <div class="breadcrumbs-container">
      <Breadcrumbs />
    </div>
    <div style="margin:20px;">
      <nav>
        <ul>
          <li><router-link to="/admin">админ</router-link></li>
          <li><router-link to="/login">логин</router-link></li>
        </ul>
      </nav>
    </div>
    <div style="margin:20px;">
      <div v-for="(item, index) in menuItems" :key="index" class="card">
        <router-link :to="`/section/${index}`">
          <img :src="item.image" :alt="item.name" class="card-image">
          <div class="card-content">
            <h2>{{ item.name }}</h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
  computed: {
    ...mapState(['menuItems'])
  },
  methods:{

  }
}
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.card-image {
  width:250px;
  height: 250px;
}

.card-content {
  padding: 15px;
}

.card-content h2 {
  margin-top: 0;
}

.card-content ul {
  list-style-type: none;
  padding: 0;
}

.card-content li {
  margin-bottom: 5px;
}
.title {
  color: #5C5696;
  font-size: 24px;
  margin: 20px;
  text-align: center;
}
.breadcrumbs-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}
img{
  width:250px;
  height: 250px;
}
nav {
  top: 15px;
  left: 50%;
  display: inline-block;
  border: 2px solid #EBECF1;
  align-content: center;
  justify-content: center;
  border-radius: 30px;
  animation: slide-in 1s ease-out;
}

ul {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  margin: 0;
  padding: 0 30px;
  list-style-type: none;
  li:not(:last-child) {
    margin-right: 40px;
  }
  li {
    border: 2px solid transparent;
    border-radius: 5px;
    padding: 10px;
    transition: background 0.2s;
    a {
      color: #2375D8;
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    ul {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      display: block;
      margin: 12px -12px;
      padding: 0;
      background: #8e8bbc;
      border: 2px solid #8e8bbc;

      border-radius: 5px;
      transition: opacity 0.2s, visibility 0.2s;
      li {
        margin: -2px 0 0 -2px;
        width: auto;
        line-height: 1.7;
        a {
          color: #2375D8;
        }
      }
    }
    &:hover {
      background: #776BCC;
      border: 2px solid #776BCC;

      a {
        color: #F9F8FD;
      }
      ul {
        visibility: visible;
        opacity: 1;
        box-shadow: 0px 3px 5px 2px #EBECF1;
        li {
          a {
            color: #F9F8FD;
          }
        }
      }
    }
  }
}

@keyframes slide-in {
  0% {
    top: -50px;
  }
  40% {
    top: 20px;
  }
  70% {
    top: 10px;
  }
  100% {
    top: 15px;
  }
}
</style>