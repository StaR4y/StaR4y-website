<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

type ProjectLink = {
  label: string;
  url: string;
};

type Project = {
  name: string;
  summary: string;
  status: string;
  tech: string[];
  links: ProjectLink[];
  updatedAt?: string;
};

type PinnedRepo = {
  author: string;
  name: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
};

const githubUser = "StaR4y";
const pinnedEndpoint = `https://pinned.berrysauce.dev/get/${githubUser}`;
const repos = ref<Project[]>([]);
const isLoading = ref(true);
const loadError = ref("");

const featuredProjects: Project[] = [
  {
    name: "Magic Ring",
    summary: "完全免费且开源的 macOS 状态栏性能监测控件 用于快速查看 CPU、内存、磁盘、电池、网络和进程占用情况",
    status: "Active",
    tech: ["Swift"],
    links: [
      { label: "Repository", url: "https://github.com/StaR4y/MagicRing重做个人主页时，我在意的几件事" },
      { label: "Preview", url: "/" },
    ],
  },
];

const pinnedFallback: Project[] = [
  {
    name: "native-obfuscator-gui",
    summary: "Native Obfuscator GUI is a JavaFX-based tool that protects Java applications by converting selected bytecode into native C++ code and generating a harder-to-decompile runnable JAR.",
    status: "3 stars",
    tech: ["Java"],
    links: [{ label: "Repository", url: "https://github.com/StaR4y/native-obfuscator-gui" }],
  },
  {
    name: "Grunt",
    summary: "JVM bytecode obfuscator framework",
    status: "GitHub",
    tech: ["Kotlin"],
    links: [{ label: "Repository", url: "https://github.com/StaR4y/Grunt" }],
  },
  {
    name: "MagicRing",
    summary: "完全免费且开源的 macOS 状态栏性能监测控件。用于快速查看 CPU、内存、磁盘、电池、网络和进程占用情况",
    status: "2 stars",
    tech: ["Swift"],
    links: [{ label: "Repository", url: "https://github.com/StaR4y/MagicRing" }],
  },
];

const projectCount = computed(() => featuredProjects.length + repos.value.length);
const techCount = computed(() => {
  const tech = new Set<string>();

  [...featuredProjects, ...repos.value].forEach((project) => {
    project.tech.forEach((item) => tech.add(item));
  });

  return tech.size;
});

const formatDate = (value?: string) => {
  if (!value) return "Pinned";

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
};

const normalizePinnedRepo = (repo: PinnedRepo): Project => ({
  name: repo.name,
  summary: repo.description || "暂未填写项目描述。",
  status: repo.stars > 0 ? `${repo.stars} stars` : "GitHub",
  tech: [repo.language].filter((item): item is string => Boolean(item)),
  links: [
    { label: "Repository", url: `https://github.com/${repo.author}/${repo.name}` },
  ],
});

const loadRepos = async () => {
  isLoading.value = true;
  loadError.value = "";

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(pinnedEndpoint, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Pinned repos responded with ${response.status}`);
    }

    const data = await response.json() as PinnedRepo[];

    if (data.length === 0) {
      throw new Error("Pinned repos response is empty");
    }

    repos.value = data.map(normalizePinnedRepo);
  } catch (error) {
    console.error(error);
    repos.value = pinnedFallback;
    loadError.value = "GitHub 主页项目同步暂时不可用，已显示最近一次确认的主页展示项目。";
  } finally {
    window.clearTimeout(timeout);
    isLoading.value = false;
  }
};

onMounted(() => {
  document.body.style.overflowY = "auto";
  loadRepos();
});

onUnmounted(() => {
  document.body.style.overflowY = "hidden";
});
</script>

<template>
  <div class="projects-page">
    <section class="projects-shell">
      <header class="projects-header">
        <div>
          <span class="eyebrow">PROJECTS</span>
          <h1>Project</h1>
          <p>
            这里是我自己最近正在折腾的一些小项目
          </p>
        </div>

        <div class="stats">
          <div>
            <strong>{{ projectCount }}</strong>
            <span>Projects</span>
          </div>
          <div>
            <strong>{{ techCount }}</strong>
            <span>Stacks</span>
          </div>
        </div>
      </header>

      <section class="section-block">
        <div class="section-title">
          <h2>Featured</h2>
          <span>Hand picked</span>
        </div>

        <div class="project-grid featured-grid">
          <article v-for="project in featuredProjects" :key="project.name" class="project-card featured-card">
            <div class="card-top">
              <span class="status">{{ project.status }}</span>
              <span class="updated">local</span>
            </div>

            <h3>{{ project.name }}</h3>
            <p>{{ project.summary }}</p>

            <div class="tech-list">
              <span v-for="item in project.tech" :key="item">{{ item }}</span>
            </div>

            <div class="card-actions">
              <a
                v-for="link in project.links"
                :key="link.url"
                :href="link.url"
                :target="link.url.startsWith('http') ? '_blank' : undefined"
                :rel="link.url.startsWith('http') ? 'noopener noreferrer' : undefined"
              >
                {{ link.label }}
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block">
        <div class="section-title">
          <h2>GitHub Profile Pins</h2>
          <span>@{{ githubUser }}</span>
        </div>

        <div v-if="isLoading" class="repo-state">正在同步 GitHub 主页展示项目...</div>
        <div v-else-if="loadError" class="repo-state warning">{{ loadError }}</div>

        <div class="project-grid">
          <article v-for="project in repos" :key="project.name" class="project-card">
            <div class="card-top">
              <span class="status">{{ project.status }}</span>
              <span class="updated">{{ formatDate(project.updatedAt) }}</span>
            </div>

            <h3>{{ project.name }}</h3>
            <p>{{ project.summary }}</p>

            <div class="tech-list">
              <span v-for="item in project.tech" :key="item">{{ item }}</span>
              <span v-if="project.tech.length === 0">暂无标签</span>
            </div>

            <div class="card-actions">
              <a v-for="link in project.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">
                {{ link.label }}
              </a>
            </div>
          </article>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.projects-page {
  --glass-bg: rgba(255, 255, 255, 0.12);
  --glass-bg-strong: rgba(255, 255, 255, 0.18);
  --glass-border: rgba(255, 255, 255, 0.26);
  --glass-border-hover: rgba(var(--primary-color-rgb), 0.42);
  --glass-shadow: 0 20px 55px rgba(0, 0, 0, 0.16);
  --glass-shadow-hover: 0 26px 70px rgba(0, 0, 0, 0.22);

  width: 100%;
  min-height: 100vh;
  padding: 7rem 1.5rem 6rem;
  color: var(--text-color);
  box-sizing: border-box;
  opacity: 0;
  animation: pageIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.projects-shell {
  width: min(980px, 100%);
  margin: 0 auto;
}

.projects-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2rem;
  align-items: end;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--track-border);
}

.eyebrow {
  display: inline-block;
  color: var(--primary-color);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  margin-top: 0.5rem;
  font-size: clamp(2.1rem, 6vw, 4rem);
  line-height: 1.08;
  font-weight: 850;
  letter-spacing: 0;
  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-header p {
  max-width: 620px;
  margin-top: 0.85rem;
  color: var(--text-color);
  opacity: 0.72;
  font-size: 0.98rem;
  line-height: 1.8;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(96px, 1fr));
  gap: 0.75rem;
}

.stats div {
  padding: 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    var(--glass-bg);
  backdrop-filter: blur(28px) saturate(150%);
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.stats strong {
  display: block;
  font-size: 1.8rem;
  font-weight: 850;
  line-height: 1;
  color: var(--primary-color);
}

.stats span {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.74rem;
  color: var(--text-color);
  opacity: 0.58;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-block {
  margin-top: 2rem;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.9rem;
}

.section-title h2 {
  font-size: 1rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title span {
  font-size: 0.78rem;
  color: var(--text-color);
  opacity: 0.5;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.featured-grid {
  grid-template-columns: 1fr;
}

.project-card {
  display: flex;
  flex-direction: column;
  min-height: 230px;
  padding: 1rem;
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.055)),
    var(--glass-bg);
  backdrop-filter: blur(30px) saturate(155%);
  -webkit-backdrop-filter: blur(30px) saturate(155%);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.project-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 34%),
    radial-gradient(circle at 84% 10%, rgba(var(--primary-color-rgb), 0.14), transparent 32%);
  opacity: 0.72;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--glass-border-hover);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.075)),
    var(--glass-bg-strong);
  box-shadow: var(--glass-shadow-hover), inset 0 1px 0 rgba(255, 255, 255, 0.26);
}

.featured-card {
  min-height: 210px;
}

.card-top {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
}

.status,
.updated,
.tech-list span {
  font-size: 0.72rem;
  line-height: 1;
  white-space: nowrap;
}

.status {
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
  color: var(--primary-color);
  border: 1px solid rgba(var(--primary-color-rgb), 0.22);
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  font-weight: 700;
}

.updated {
  color: var(--text-color);
  opacity: 0.45;
}

.project-card h3 {
  position: relative;
  z-index: 1;
  margin-top: 1rem;
  color: var(--text-color);
  font-size: 1.15rem;
  font-weight: 780;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.project-card p {
  position: relative;
  z-index: 1;
  margin-top: 0.55rem;
  color: var(--text-color);
  opacity: 0.68;
  font-size: 0.9rem;
  line-height: 1.65;
}

.tech-list {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 1rem;
}

.tech-list span {
  padding: 0.38rem 0.48rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  color: var(--text-color);
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.11);
  backdrop-filter: blur(14px) saturate(135%);
  -webkit-backdrop-filter: blur(14px) saturate(135%);
}

.card-actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.card-actions a {
  padding: 0.48rem 0.62rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 650;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(145%);
  -webkit-backdrop-filter: blur(16px) saturate(145%);
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.card-actions a:hover {
  color: var(--primary-color);
  border-color: var(--glass-border-hover);
  background: rgba(255, 255, 255, 0.18);
}

.repo-state {
  padding: 1rem;
  margin-bottom: 0.85rem;
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-color);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    var(--glass-bg);
  backdrop-filter: blur(26px) saturate(150%);
  -webkit-backdrop-filter: blur(26px) saturate(150%);
  box-shadow: var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  opacity: 0.76;
}

.repo-state.warning {
  border-color: rgba(255, 180, 90, 0.4);
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

@media (max-width: 820px) {
  .projects-header {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

[data-theme='dark'] .projects-page {
  --glass-bg: rgba(16, 18, 28, 0.34);
  --glass-bg-strong: rgba(24, 27, 42, 0.44);
  --glass-border: rgba(255, 255, 255, 0.13);
  --glass-shadow: 0 20px 55px rgba(0, 0, 0, 0.28);
  --glass-shadow-hover: 0 26px 70px rgba(0, 0, 0, 0.36);
}

@media (max-width: 560px) {
  .projects-page {
    padding: 6rem 1rem 5rem;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
