<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { getBlogPost, getRelatedPosts } from "@/data/blog";

const route = useRoute();
const post = computed(() => getBlogPost(String(route.params.slug)));
const relatedPosts = computed(() => post.value ? getRelatedPosts(post.value) : []);

const formatDate = (value: string) => new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date(value));

onMounted(() => {
  document.body.style.overflowY = "auto";
});

onUnmounted(() => {
  document.body.style.overflowY = "hidden";
});
</script>

<template>
  <div class="post-page">
    <article v-if="post" class="post-shell">
      <RouterLink to="/blog" class="back-link">返回 Blog</RouterLink>

      <header class="post-header">
        <div class="post-meta">
          <span>{{ post.category }}</span>
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <span>{{ post.readingMinutes }} min read</span>
        </div>
        <h1>{{ post.title }}</h1>
        <p>{{ post.excerpt }}</p>
        <div class="tag-row">
          <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
        </div>
      </header>

      <section class="post-content">
        <template v-for="(block, index) in post.content" :key="index">
          <h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
          <p v-else-if="block.type === 'paragraph'">{{ block.text }}</p>
          <blockquote v-else-if="block.type === 'quote'">{{ block.text }}</blockquote>
          <ul v-else-if="block.type === 'list'">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
          <pre v-else-if="block.type === 'code'"><code>{{ block.text }}</code></pre>
        </template>
      </section>

      <section v-if="relatedPosts.length" class="related">
        <h2>相关阅读</h2>
        <div class="related-grid">
          <RouterLink v-for="item in relatedPosts" :key="item.slug" :to="`/blog/${item.slug}`">
            <span>{{ item.category }}</span>
            <strong>{{ item.title }}</strong>
          </RouterLink>
        </div>
      </section>
    </article>

    <section v-else class="missing-post">
      <span>404</span>
      <h1>这篇文章暂时不存在</h1>
      <RouterLink to="/blog">返回 Blog</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.post-page {
  --glass-bg: rgba(255, 255, 255, 0.13);
  --glass-border: rgba(255, 255, 255, 0.26);
  --glass-shadow: 0 20px 55px rgba(0, 0, 0, 0.14);

  width: 100%;
  min-height: 100vh;
  padding: 7rem 1.5rem 6rem;
  color: var(--text-color);
  box-sizing: border-box;
  opacity: 0;
  animation: pageIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.post-shell,
.missing-post {
  width: min(820px, 100%);
  margin: 0 auto;
}

.back-link,
.missing-post a {
  display: inline-block;
  padding: 0.55rem 0.72rem;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 700;
  backdrop-filter: blur(18px) saturate(145%);
  -webkit-backdrop-filter: blur(18px) saturate(145%);
}

.post-header,
.post-content,
.related,
.missing-post {
  margin-top: 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.055)),
    var(--glass-bg);
  backdrop-filter: blur(30px) saturate(155%);
  -webkit-backdrop-filter: blur(30px) saturate(155%);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.post-header {
  padding: clamp(1.2rem, 4vw, 2rem);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  color: var(--text-color);
  opacity: 0.58;
  font-size: 0.78rem;
}

h1,
h2,
p {
  margin: 0;
}

.post-header h1 {
  margin-top: 0.7rem;
  font-size: clamp(2rem, 7vw, 4.2rem);
  line-height: 1.08;
  font-weight: 850;
  letter-spacing: 0;
  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.post-header p {
  margin-top: 0.85rem;
  color: var(--text-color);
  opacity: 0.72;
  line-height: 1.8;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.tag-row span {
  padding: 0.38rem 0.5rem;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  opacity: 0.72;
  font-size: 0.76rem;
}

.post-content {
  padding: clamp(1.2rem, 4vw, 2rem);
}

.post-content h2 {
  margin: 2rem 0 0.7rem;
  color: var(--text-color);
  font-size: 1.3rem;
  font-weight: 780;
}

.post-content h2:first-child {
  margin-top: 0;
}

.post-content p,
.post-content li,
.post-content blockquote {
  color: var(--text-color);
  opacity: 0.78;
  line-height: 1.9;
  font-size: 1rem;
}

.post-content p + p {
  margin-top: 1rem;
}

.post-content ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.post-content blockquote {
  margin: 1.2rem 0;
  padding: 1rem;
  border-left: 3px solid var(--primary-color);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
}

.post-content pre {
  margin: 1.2rem 0 0;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.32);
}

.post-content code {
  color: #e8fff9;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.88rem;
}

.related {
  padding: 1.2rem;
}

.related h2 {
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 780;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 0.8rem;
}

.related-grid a {
  padding: 0.9rem;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.related-grid span {
  display: block;
  color: var(--primary-color);
  font-size: 0.72rem;
  margin-bottom: 0.4rem;
}

.related-grid strong {
  font-size: 0.9rem;
  line-height: 1.4;
}

.missing-post {
  padding: 2rem;
  text-align: center;
}

.missing-post span {
  color: var(--primary-color);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.missing-post h1 {
  margin: 0.5rem 0 1rem;
  color: var(--text-color);
  font-size: clamp(1.6rem, 6vw, 3rem);
  font-weight: 850;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-theme='dark'] .post-page {
  --glass-bg: rgba(16, 18, 28, 0.34);
  --glass-border: rgba(255, 255, 255, 0.13);
  --glass-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
}

@media (max-width: 720px) {
  .related-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .post-page {
    padding: 6rem 1rem 5rem;
  }
}
</style>
