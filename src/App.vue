<template>
  <div class="home">
    <div>
      <h2>皆大歡喜 II</h2>
      <a
        href="https://www.youtube.com/playlist?list=PLoiJHOPFy5mUKH4ueyYSjQDUbq1BCpEoo"
        target="_blank"
        >[YouTube 播放列表]</a
      >
    </div>

    <hr />

    <div class="btn-list">
      <span>排序：</span>
      <button class="btn" :class="{ cur: isNewSort }" @click="changeSort(true)">
        <span>按最新发布</span>
      </button>
      <button
        class="btn"
        :class="{ cur: !isNewSort }"
        @click="changeSort(false)"
      >
        <span>按集数序号</span>
      </button>
    </div>

    <hr />

    <ul class="playlist" v-if="playlist.length && isLoadDone">
      <li class="item" v-for="item in playlist" :key="item.videoUrl">
        <p>
          <span class="title">第 {{ item.index }} 集</span>
          <a class="play" :href="item.videoUrl" target="_blank">[播放]</a>
        </p>
        <p class="create-time">{{ item.createTime }}</p>
      </li>
    </ul>
    <p v-else>正在请求列表，请稍候…</p>
  </div>

  <div class="go-to-top" @click="goToTop">Top ⬆</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import queryPlaylist from '@libs/queryPlaylist'
import type { PlaylistItem } from '@/types'

const isLoadDone = ref<boolean>(false)
const isNewSort = ref<boolean>(true)
const playlist = ref<PlaylistItem[]>([])

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function changeSort(isNew: boolean) {
  isNewSort.value = isNew
  sort()
}

function sort() {
  playlist.value = playlist.value.sort((a, b) =>
    isNewSort.value ? b.index - a.index : a.index - b.index
  )
  isLoadDone.value = true
}

async function getList(token?: string): Promise<void> {
  const { list, nextPageToken } = await queryPlaylist(token || '')
  playlist.value = [...playlist.value, ...list]

  if (!list.length || !nextPageToken) {
    sort()
    return
  }

  setTimeout(() => {
    getList(nextPageToken)
  }, 100)
}
onMounted(getList)
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0 @margin;
  margin: 0 auto;
  hr {
    margin: @margin 0;
  }
  .btn-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      margin: 0 (@margin / 4);
      &.cur {
        color: @color-blue;
      }
    }
  }

  .playlist {
    // display: flex;
    // align-items: center;
    margin: 0;
    padding: 0;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 0 @margin 0;
      p {
        margin: 0;
      }
      .title {
        width: 80px;
        margin-right: @margin;
      }
      .create-time {
        font-size: 14px;
        color: @color-gray;
        margin-top: (@margin / 4);
      }
    }
  }
}

.go-to-top {
  position: fixed;
  right: @margin;
  bottom: @margin;
}
</style>
