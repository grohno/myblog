<template>
  <div class="page-nav" v-if="prev || next">
    <p class="inner">
      <span v-if="prev" class="prev">
        ←
        <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
      </span>

      <span v-if="next" class="next">
        <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>
        →
      </span>
    </p>
  </div>
</template>
<script>
import { resolvePage } from '../util'
import isString from 'lodash/isString'
import isNil from 'lodash/isNil'

export default {
  name: 'PageNav',
  props: ['sidebarItems'],
  computed: {
        // 新規メソッド
    sortedPosts() {
      return this.$site.pages
          // blogディレクトリ以下のページを次へ前へリンク自動生成
          .filter(post => post.path.startsWith('/blog/'))
          // dateに設定した日付の降順にソートする
          .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    },
    // 新規メソッド
    pageIdx() {
      return this.sortedPosts
          .findIndex(page => page.path == this.$page.path)
    },
    prev () {
      //return resolvePageLink(LINK_TYPES.PREV, this)
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (typeof prev === "undefined" && this.pageIdx > 0) {
        const prevPath = this.sortedPosts[this.pageIdx - 1].path
        return resolvePage(this.$site.pages, prevPath, this.$route.path)
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      //return resolvePageLink(LINK_TYPES.NEXT, this)
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
        // 最後より一つ前のページまで次へリンクを生成する
      } else if (typeof next === "undefined" && this.pageIdx < this.sortedPosts.length - 1) {
        const nextPath = this.sortedPosts[this.pageIdx + 1].path
        return resolvePage(this.$site.pages, nextPath, this.$route.path)
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev
  }
}

function resolvePageLink (
  linkType,
  { $themeConfig, $page, $route, $site, sidebarItems }
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig)

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page)

  // Page link config will overwrite global theme link config if defined
  const link = isNil(pageLinkConfig) ? themeLinkConfig : pageLinkConfig

  if (link === false) {
    return
  } else if (isString(link)) {
    return resolvePage($site.pages, link, $route.path)
  } else {
    return resolveLink($page, sidebarItems)
  }
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>
<style lang="stylus">
@require '../styles/wrapper.styl'

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    display inline-block
    line-height 1.2
    float right
    background #3F3F3F
    color #ffffff
    border-radius 3px
    padding 5px 20px
    box-shadow 0px 2px 2px 0px #666666
    a
     color #EFEFEF
  span.prev
    display inline-block
    line-height 1.2
    background #3F3F3F
    color #ffffff
    border-radius 3px
    padding 5px 20px
    box-shadow 0px 2px 2px 0px #666666
    a
     color #EFEFEF
@media (max-width: $MQMobile)
  .page-nav
    .inner span:first-child
      margin-bottom 10px
    .inner
      text-align center
      .next
        float none
</style>
