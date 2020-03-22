// PostList.vue
<template>
    <div class="bloglist">
        <div class="blogpost" v-for="post in posts">
            <h2><a v-bind:href="post.path">{{post.title}}</a></h2>
            <p>{{post.frontmatter.description}}</p>
            <p>{{post.frontmatter.category}}</p>
            <a class="readmore" v-bind:href="post.path">続きを読む</a>
        </div><!-- .blogpost end -->
    </div><!-- .bloglist end -->

    <!-- <h1>BLOG NEWS一覧</h1>
    <div class="bloglist">
        <div class="blogpost" v-for="post in posts('news')">
            <h2><a v-bind:href="post.path">{{post.title}}</a></h2>
            <p>{{post.frontmatter.description}}</p>
            <a class="readmore" v-bind:href="post.path">続きを読む</a>
        </div>
    </div> -->

</template>
<script>
// export default {
//     props: ["folder"],
//     computed: {
//       posts: function(){
//         return function(category) {
//           if (category) {
//               return this.$site.pages
//                   // blogディレクトリ以下を投稿記事一覧表示の対象とする
//                   .filter( (post => post.path.startsWith(this.folder)) && (post => post.frontmatter.category===category) )
//                   // dateに設定した日付の降順にソートする
//                   .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
//           } else {
//               return this.$site.pages
//                   // blogディレクトリ以下を投稿記事一覧表示の対象とする
//                   .filter( post => post.path.startsWith(this.folder) )
//                   // dateに設定した日付の降順にソートする
//                   .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
//           }
//         }
//       }
//     } 
// }

export default {
    props: ['folder','category'],
    computed: {
        posts() {
          if (!this.category) {
            return this.$site.pages
                // blogディレクトリ以下を投稿記事一覧表示の対象とする
                .filter( post => post.path.startsWith(this.folder) )
                // dateに設定した日付の降順にソートする
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
          } else {
            return this.$site.pages
                // blogディレクトリ以下を投稿記事一覧表示の対象とする
                .filter( (post => post.path.startsWith(this.folder)) && (post => post.frontmatter.category === this.category) )
                // dateに設定した日付の降順にソートする
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
          }
        }
    }
}


</script>

<style lang="stylus">
  .bloglist
    padding 20px
  .bloglist .blogpost
    padding 10px
    margin-bottom 20px
    position relative
  .bloglist .blogpost:last-child
    margin-bottom 0
  .bloglist .blogpost:nth-child(2n+1)
    background #DFE6F5
  .bloglist .blogpost h2
    padding 0
    margin 0 0 10px
  .bloglist .blogpost h2 a
    font-size: 18px
    font-weight bold
  .bloglist .blogpost p
    padding 0 6em 0 0;
    margin 0
  .bloglist .blogpost .readmore
    position absolute
    bottom: 10px
    right 10px
@media (max-width: $MQMobileNarrow)
    .bloglist
      padding 0
</style>