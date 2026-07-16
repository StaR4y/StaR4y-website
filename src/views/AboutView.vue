<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { publishedPosts } from "@/data/blog";

const query = ref("");
const selectedCategory = ref("全部");
const selectedTag = ref("全部");
const sortMode = ref<"newest" | "oldest" | "short">("newest");

const categories = computed(() => [
  "全部",
  ...Array.from(new Set(publishedPosts.map((post) => post.category))),
]);

const tags = computed(() => [
  "全部",
  ...Array.from(new Set(publishedPosts.flatMap((post) => post.tags))),
]);

const featuredPost = computed(() => publishedPosts.find((post) => post.pinned) || publishedPosts[0]);

const filteredPosts = computed(() => {
  const keyword = query.value.trim().toLowerCase();

  return publishedPosts
    .filter((post) => {
      const matchesKeyword = !keyword || [
        post.title,
        post.excerpt,
        post.category,
        ...post.tags,
      ].some((value) => value.toLowerCase().includes(keyword));
      const matchesCategory = selectedCategory.value === "全部" || post.category === selectedCategory.value;
      const matchesTag = selectedTag.value === "全部" || post.tags.includes(selectedTag.value);

      return matchesKeyword && matchesCategory && matchesTag;
    })
    .sort((a, b) => {
      if (sortMode.value === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortMode.value === "short") return a.readingMinutes - b.readingMinutes;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
});

const archiveGroups = computed(() => {
  const groups = new Map<string, number>();

  publishedPosts.forEach((post) => {
    const key = post.date.slice(0, 7);
    groups.set(key, (groups.get(key) || 0) + 1);
  });

  return Array.from(groups.entries()).map(([month, count]) => ({ month, count }));
});

const totalMinutes = computed(() => publishedPosts.reduce((total, post) => total + post.readingMinutes, 0));

const resetFilters = () => {
  query.value = "";
  selectedCategory.value = "全部";
  selectedTag.value = "全部";
  sortMode.value = "newest";
};

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
  <div class="blog-page">
    <section class="blog-shell">
      <header class="blog-header">
        <div>
          <span class="eyebrow">BLOG</span>
          <h1>记录一些正在发生的学习与折腾</h1>
          <p>
            关于前端、项目维护、界面细节和学习节奏的短记录。写得轻一点，但尽量留下能被未来的自己接住的线索。
          </p>
        </div>

        <div class="blog-stats">
          <div>
            <strong>{{ publishedPosts.length }}</strong>
            <span>Posts</span>
          </div>
          <div>
            <strong>{{ categories.length - 1 }}</strong>
            <span>Categories</span>
          </div>
          <div>
            <strong>{{ totalMinutes }}</strong>
            <span>Minutes</span>
          </div>
        </div>
      </header>

      <section v-if="featuredPost" class="featured-post">
        <div class="featured-meta">
          <span>Featured</span>
          <time :datetime="featuredPost.date">{{ formatDate(featuredPost.date) }}</time>
        </div>
        <div class="featured-content">
          <div>
            <h2>{{ featuredPost.title }}</h2>
            <p>{{ featuredPost.excerpt }}</p>
          </div>
          <RouterLink :to="`/blog/${featuredPost.slug}`" class="read-link">阅读全文</RouterLink>
        </div>
      </section>

      <section class="blog-layout">
        <aside class="blog-sidebar">
          <div class="control-panel">
            <label for="blog-search">搜索文章</label>
            <input id="blog-search" v-model="query" type="search" placeholder="标题、标签、分类..." />
          </div>

          <div class="control-panel">
            <label for="blog-sort">排序</label>
            <select id="blog-sort" v-model="sortMode">
              <option value="newest">最新优先</option>
              <option value="oldest">最早优先</option>
              <option value="short">阅读时间短优先</option>
            </select>
          </div>

          <div class="filter-panel">
            <div class="panel-title">分类</div>
            <button
              v-for="category in categories"
              :key="category"
              type="button"
              :class="{ active: selectedCategory === category }"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div class="filter-panel">
            <div class="panel-title">标签</div>
            <button
              v-for="tag in tags"
              :key="tag"
              type="button"
              :class="{ active: selectedTag === tag }"
              @click="selectedTag = tag"
            >
              {{ tag }}
            </button>
          </div>

          <div class="archive-panel">
            <div class="panel-title">归档</div>
            <div v-for="group in archiveGroups" :key="group.month" class="archive-row">
              <span>{{ group.month }}</span>
              <span>{{ group.count }}</span>
            </div>
          </div>
        </aside>

        <main class="post-list">
          <div class="list-head">
            <span>{{ filteredPosts.length }} 篇文章</span>
            <button type="button" @click="resetFilters">重置筛选</button>
          </div>

          <article v-for="post in filteredPosts" :key="post.slug" class="post-card">
            <div class="post-meta">
              <span>{{ post.category }}</span>
              <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              <span>{{ post.readingMinutes }} min</span>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.excerpt }}</p>
            <div class="tag-row">
              <button v-for="tag in post.tags" :key="tag" type="button" @click="selectedTag = tag">
                #{{ tag }}
              </button>
            </div>
            <RouterLink :to="`/blog/${post.slug}`" class="card-link">打开文章</RouterLink>
          </article>

          <div v-if="filteredPosts.length === 0" class="empty-state">
            没有找到符合条件的文章。
          </div>
        </main>
      </section>
    </section>
  </div>
</template>

<style scoped>
.blog-page {
  --glass-bg: rgba(255, 255, 255, 0.13);
  --glass-bg-strong: rgba(255, 255, 255, 0.2);
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

.blog-shell {
  width: min(1080px, 100%);
  margin: 0 auto;
}

.blog-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--track-border);
}

.eyebrow,
.panel-title {
  color: var(--primary-color);
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  margin-top: 0.5rem;
  max-width: 760px;
  font-size: clamp(2.1rem, 6vw, 4.2rem);
  line-height: 1.08;
  font-weight: 850;
  letter-spacing: 0;
  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.blog-header p {
  max-width: 720px;
  margin-top: 0.85rem;
  color: var(--text-color);
  opacity: 0.72;
  line-height: 1.8;
}

.blog-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(86px, 1fr));
  gap: 0.75rem;
}

.blog-stats div,
.featured-post,
.control-panel,
.filter-panel,
.archive-panel,
.post-card,
.empty-state {
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.055)),
    var(--glass-bg);
  backdrop-filter: blur(28px) saturate(150%);
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.blog-stats div {
  padding: 1rem;
}

.blog-stats strong {
  display: block;
  color: var(--primary-color);
  font-size: 1.75rem;
  font-weight: 850;
  line-height: 1;
}

.blog-stats span {
  display: block;
  margin-top: 0.35rem;
  color: var(--text-color);
  opacity: 0.58;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.featured-post {
  margin-top: 2rem;
  padding: 1.2rem;
}

.featured-meta,
.post-meta,
.list-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  color: var(--text-color);
  opacity: 0.58;
  font-size: 0.78rem;
}

.featured-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.5rem;
  align-items: end;
  margin-top: 0.8rem;
}

.featured-content h2,
.post-card h2 {
  color: var(--text-color);
  font-size: 1.35rem;
  font-weight: 780;
  line-height: 1.35;
}

.featured-content p,
.post-card p {
  margin-top: 0.55rem;
  color: var(--text-color);
  opacity: 0.7;
  line-height: 1.75;
}

.blog-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
  margin-top: 1rem;
}

.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: sticky;
  top: 6rem;
}

.control-panel,
.filter-panel,
.archive-panel {
  padding: 1rem;
}

.control-panel label {
  display: block;
  color: var(--primary-color);
  font-size: 0.72rem;
  font-weight: 760;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.control-panel input,
.control-panel select {
  width: 100%;
  margin-top: 0.55rem;
  padding: 0.72rem 0.78rem;
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}

.control-panel input:focus,
.control-panel select:focus {
  border-color: var(--primary-color);
}

.filter-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.panel-title {
  width: 100%;
}

.filter-panel button,
.tag-row button,
.list-head button,
.read-link,
.card-link {
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-color);
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.filter-panel button {
  padding: 0.45rem 0.58rem;
  font-size: 0.78rem;
}

.filter-panel button.active,
.filter-panel button:hover,
.tag-row button:hover,
.list-head button:hover,
.read-link:hover,
.card-link:hover {
  color: var(--primary-color);
  border-color: rgba(var(--primary-color-rgb), 0.45);
  background: rgba(255, 255, 255, 0.18);
}

.archive-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.7rem;
  color: var(--text-color);
  opacity: 0.66;
  font-size: 0.84rem;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.list-head {
  justify-content: space-between;
  opacity: 1;
}

.list-head button,
.read-link,
.card-link {
  padding: 0.55rem 0.7rem;
  font-size: 0.82rem;
  font-weight: 700;
}

.post-card {
  padding: 1.1rem;
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 34%),
    radial-gradient(circle at 92% 8%, rgba(var(--primary-color-rgb), 0.14), transparent 30%);
}

.post-card > * {
  position: relative;
  z-index: 1;
}

.post-card h2 {
  margin-top: 0.65rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1rem;
}

.tag-row button {
  padding: 0.38rem 0.5rem;
  font-size: 0.76rem;
}

.card-link {
  display: inline-block;
  width: fit-content;
  margin-top: 1rem;
}

.empty-state {
  padding: 2rem;
  color: var(--text-color);
  opacity: 0.7;
  text-align: center;
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

[data-theme='dark'] .blog-page {
  --glass-bg: rgba(16, 18, 28, 0.34);
  --glass-bg-strong: rgba(24, 27, 42, 0.44);
  --glass-border: rgba(255, 255, 255, 0.13);
  --glass-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
}

@media (max-width: 900px) {
  .blog-header,
  .featured-content,
  .blog-layout {
    grid-template-columns: 1fr;
  }

  .blog-sidebar {
    position: static;
  }
}

@media (max-width: 560px) {
  .blog-page {
    padding: 6rem 1rem 5rem;
  }

  .blog-stats {
    grid-template-columns: 1fr;
  }
}
</style>
