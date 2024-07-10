<template>
  <div>
    <nav>
      <ul>
        <li><router-link to="/admin">админ</router-link></li>
        <li><router-link to="/login">логин</router-link></li>
      </ul>
    </nav>
    <breadcrumbs style="margin-top: 100px"/>
    <h1>Главная</h1>
    <nav>
      <ul>
        <li v-for="(item, index) in menuItems" :key="index">
          <router-link :to="`/section/${index}`">{{ item.name }}</router-link>
          <ul v-if="item.subsections && item.subsections.length > 0">
            <li v-for="(subsection, subIndex) in item.subsections" :key="subIndex">
              <router-link :to="`/section/${index}/${subIndex}`">{{ subsection.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Breadcrumbs from "@/components/Breadcrumbs.vue";

export default {
  components: {Breadcrumbs},
  computed: {
    ...mapState(['menuItems'])
  }
}
</script>
<style scoped>


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