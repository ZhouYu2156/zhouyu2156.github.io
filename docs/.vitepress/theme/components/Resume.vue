<script setup lang="ts"></script>

<template>
  <div class="resume-page">
    <div id="resume" class="resume-card">
      <!-- ===== SIDEBAR ===== -->
      <div class="sidebar">
        <div class="avatar-area">
          <div class="avatar">
            <img src="/avatars/profile.jpg" alt="头像" />
          </div>
          <div class="avatar-name">周 玉</div>
          <div class="avatar-role">Frontend Engineer</div>
        </div>

        <!-- Contact -->
        <div class="sidebar-section">
          <div class="sidebar-title">联系方式</div>
          <ul class="contact-list">
            <li>
              <div class="contact-icon">📱</div>
              <div>
                <span class="contact-label">手机</span>
                <span class="contact-value">13037475430</span>
              </div>
            </li>
            <li>
              <div class="contact-icon">✉️</div>
              <div>
                <span class="contact-label">邮箱</span>
                <span class="contact-value">1043744584@qq.com</span>
              </div>
            </li>
            <li>
              <div class="contact-icon">🔗</div>
              <div>
                <span class="contact-label">GitHub</span>
                <span class="contact-value">github.com/ZhouYu2156</span>
              </div>
            </li>
            <li>
              <div class="contact-icon">👤</div>
              <div>
                <span class="contact-label">性别 / 学历</span>
                <span class="contact-value">男 · 统招本科</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Job Intention -->
        <div class="sidebar-section">
          <div class="sidebar-title">求职意向</div>
          <div class="intention-item">
            <span class="intention-label">岗位</span>
            <span class="intention-value">前端工程师</span>
          </div>
          <div class="intention-item">
            <span class="intention-label">城市</span>
            <span class="intention-value">杭州</span>
          </div>
          <div class="intention-item">
            <span class="intention-label">薪资</span>
            <span class="intention-value">8K - 12K</span>
          </div>
          <div class="intention-item">
            <span class="intention-label">到岗</span>
            <span class="intention-value">立即到岗</span>
          </div>
        </div>

        <!-- Skill Bars -->
        <div class="sidebar-section">
          <div class="sidebar-title">核心技能</div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>Vue / React</span><span>90%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 90%"></div>
            </div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>TypeScript</span><span>85%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 85%"></div>
            </div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>HTML / CSS / Sass</span><span>90%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 90%"></div>
            </div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>Django / Python</span><span>80%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 80%"></div>
            </div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>MySQL / Redis</span><span>75%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 75%"></div>
            </div>
          </div>
          <div class="skill-bar-group">
            <div class="skill-bar-label"><span>Docker / CI/CD</span><span>70%</span></div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 70%"></div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <div class="sidebar-section">
          <div class="sidebar-title">教育背景</div>
          <div class="edu-mini">
            <div class="school">吉首大学张家界学院（本科）</div>
            <div class="meta">计算机科学与技术 · 2023.09 ~ 2025.06<br /><strong>GPA 3.4/4.0</strong> · 专业前 10%</div>
          </div>
          <div class="edu-mini">
            <div class="school">湖南软件职业技术学院（专科）</div>
            <div class="meta">软件技术 Web方向 · 2020.09 ~ 2023.06<br /><strong>GPA 3.6/4.0</strong> · 专业前 5%</div>
          </div>
        </div>
      </div>

      <!-- ===== MAIN ===== -->
      <div class="main">
        <!-- 个人优势 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">💎</div>
            <h2>个人优势</h2>
          </div>
          <div class="advantages">
            <div class="adv-card">具备全栈开发能力，可独立完成项目设计、架构、开发到部署的全流程</div>
            <div class="adv-card">熟悉多端开发和自动化流水线构建，缩短开发周期与提升交付效率</div>
            <div class="adv-card">熟练使用 AI 编程，编写有效的提示词精准实现功能与提高代码质量</div>
          </div>
        </div>

        <!-- 专业技能 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">🛠️</div>
            <h2>专业技能</h2>
          </div>
          <div class="skill-detail">
            <strong>计算机基础：</strong>熟悉 TCP/IP，HTTP(S)、WebSocket 网络协议、浏览器渲染原理、Chrome
            调试工具和性能优化分析，常见算法如递归、冒泡排序、二分查找等，设计模式如单例、工厂、装饰器、发布订阅等<br />
            <strong>编程基础：</strong>熟练掌握 HTML、CSS、TypeScript、Sass、Python
            基础，具备良好的抽象思维和面向对象思维，理解盒模型、常见网页布局、响应式适配、CSS 3
            动画、事件循环、事件委托、闭包、原型链、异步编程、Ajax 和 Promise 等技术，了解 C、Java 语言<br />
            <strong>前端框架：</strong>熟练前端主流技术线，如 Bootstrap、Jquery、Axios、Vue、React 及相关生态，熟悉
            Vite、Webpack 打包工具和前端工程化开发规范，熟悉 Nuxt.js 服务端渲染框架，了解 Monorepo、Lerna 架构方案和
            Electron 桌面开发<br />
            <strong>后端框架：</strong>熟悉 Django、DRF、Flask、Express 开发后端服务，和 Request、Scrapy、Selenium
            等爬虫技术<br />
            <strong>数据库：</strong>熟悉 MySQL 数据库设计、事务与锁和 SQL 优化技巧，了解 Redis、MongoDB 应用场景<br />
            <strong>运维：</strong>熟悉 Linux 开发环境、配置 Nginx 服务器、反向代理和负载均衡，Git/SVN
            版本控制工具，Docker 容器化部署，和 GitHub Action、CI/CD 自动化流水线构建<br />
            <strong>图形化：</strong>熟悉 Canvas、SVG 绘图，可手写常见特效和音频可视化效果，熟悉 Echarts.js
            图表库绘制常见数据图表，了解 Three.js 3D 绘图和 D3.js 数据可视化<br />
            <strong>多端开发：</strong>熟悉 UniApp 多端开发和微信支付、支付宝支付开放接口<br />
            <strong>AI 工具：</strong>熟悉 Cursor、Trae 等 AI 工具，利用其提升效率和代码质量<br />
            <strong>开发工具：</strong>熟练使用 PyCharm、WebStorm、VSCode 等主流开发工具
          </div>
        </div>

        <!-- 项目经验 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">🚀</div>
            <h2>项目经验</h2>
          </div>

          <!-- P1 -->
          <div class="project">
            <div class="project-top">
              <h3>悟空分身安卓应用 <span class="badge">Python 工程师</span></h3>
              <span class="date">2025.08 - 2026.01</span>
            </div>
            <div class="project-body">
              <div class="tech-tags">
                <span class="tech-tag">Django</span>
                <span class="tech-tag">Redis</span>
                <span class="tech-tag">Request</span>
                <span class="tech-tag">火山引擎</span>
              </div>
              <h4>项目背景</h4>
              <p>
                广大用户对手机应用多开存在强烈需求，悟空分身作为厦门量子堆栈旗下核心安卓工具类应用，以13MB超轻包体提供容器技术，实现应用无限多开、账号自由切换，同时集成AI生图、抖音无水印视频下载、看广告免费使用等功能，聚焦用户核心需求，进一步优化功能、拓展商业变现渠道。
              </p>
              <h4>我的职责</h4>
              <ul>
                <li>
                  基于Django框架与Redis缓存技术，对接广告业务接口，完成广告接入、展示逻辑开发及数据统计，搭建稳定高效的商业变现链路，助力产品盈利提升
                </li>
                <li>
                  集成火山引擎人脸融合、文生图等AI服务接口，完成接口联调、参数配置与异常处理，确保AI功能顺畅运行，丰富应用功能维度、提升用户体验
                </li>
                <li>
                  完善微信小程序端AI生图功能，优化小程序广告变现模块，梳理安卓端与小程序端数据交互逻辑，实现多端变现协同统一
                </li>
                <li>开发抖音无水印视频下载功能，实现用户复制抖音分享链接即可完成无水印下载，满足用户额外使用需求</li>
              </ul>
              <h4>项目成果</h4>
              <ul class="result-list">
                <li>
                  成功对接广告业务、集成火山引擎AI功能及抖音无水印下载功能，丰富了应用功能矩阵，有效提升用户留存率，助力产品实现显著商业变现
                </li>
                <li>
                  完善微信小程序端相关功能，实现安卓端、小程序端多端同步变现，进一步拓宽商业收入渠道，提升产品盈利能力
                </li>
                <li>抖音无水印下载功能顺利落地，满足用户多样化需求，进一步增强产品竞争力</li>
              </ul>
            </div>
          </div>

          <!-- P2 -->
          <div class="project">
            <div class="project-top">
              <h3>小兔鲜儿电商微信小程序 <span class="badge">前端工程师</span></h3>
              <span class="date">2025.05 - 2025.07</span>
            </div>
            <div class="project-body">
              <div class="tech-tags">
                <span class="tech-tag">Vue 3</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">Vite</span>
                <span class="tech-tag">Pinia</span>
                <span class="tech-tag">Sass</span>
                <span class="tech-tag">Uni UI</span>
                <span class="tech-tag">SKU</span>
                <span class="tech-tag">微信小程序</span>
              </div>
              <h4>项目背景</h4>
              <p>
                公司希望简化用户操作，便于顾客在微信端一体化完成网购的各个环节，因此开发此轻量小程序实现选品、下单、付款、物流等全流程功能
              </p>
              <h4>我的职责</h4>
              <ul>
                <li>基于 Vite + TypeScript 搭建开发环境，使用 ESLint + Prettier 规范代码风格</li>
                <li>封装 http 请求工具，基于 Promise 封装 uni.request，实现请求响应拦截器</li>
                <li>使用 Pinia + persist 插件实现状态持久化，解决购物车等数据同步问题</li>
                <li>封装 XtxSwiper 轮播图组件，实现首页商品推荐、分类导航等功能</li>
                <li>基于 sku 组件开发商品详情页，处理多规格商品选择</li>
                <li>集成微信登录与支付功能，打通下单支付流程</li>
              </ul>
              <h4>项目成果</h4>
              <ul class="result-list">
                <li><span class="result-badge">界面</span>高保真还原小程序各页面和交互功能，实现完整的项目系统功能</li>
                <li>
                  <span class="result-badge">性能</span>利用微信小程序<strong>分包策略</strong>减小主包体积，缩短页面加载时间和提高用户访问体验
                </li>
                <li>
                  <span class="result-badge">适配</span>通过 uni-app 条件编译消除平台接口差异，经 HBuilder 打包多端发布
                </li>
              </ul>
            </div>
          </div>

          <!-- P3 -->
          <div class="project">
            <div class="project-top">
              <h3>创意绿洲知识付费平台 <span class="badge">全栈工程师</span></h3>
              <span class="date">2025.03 - 2025.05</span>
            </div>
            <div class="project-body">
              <div class="tech-tags">
                <span class="tech-tag">Vue 3</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">Element Plus</span>
                <span class="tech-tag">Tailwind CSS</span>
                <span class="tech-tag">Django</span>
                <span class="tech-tag">DRF</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">Nginx</span>
              </div>
              <h4>项目背景</h4>
              <p>
                人人自媒体时代背景下，为助力个人实现知识商业变现、拓展个人影响力，同时为技术学者提供优质视频教程、付费资料等资源，开发本知识付费平台，核心涵盖音乐、技术视频教程、付费资料三大板块
              </p>
              <h4>我的职责</h4>
              <ul>
                <li>
                  <strong>独立负责</strong>项目全流程开发，涵盖需求分析、数据库设计、架构搭建、前端后端开发及上线部署，全程把控项目进度与质量
                </li>
                <li>
                  基于Vue
                  3+TypeScript技术栈搭建前端界面，实现登录注册、音乐控件面板、个人中心等核心模块的完整交互功能，兼顾页面美观与用户体验
                </li>
                <li>
                  设计并实现付费资源<strong>会员订阅机制</strong>，集成微信支付功能，保障付费流程顺畅、安全，支撑平台商业变现
                </li>
                <li>
                  通过<strong>JS逆向分析</strong>破解酷狗加密参数，利用Requests爬取酷狗音乐详情数据，丰富平台音乐资源维度
                </li>
                <li>优化网站<strong>SEO</strong>检索能力，搭建搜索引擎引流体系，提升平台曝光量与客户获取效率</li>
              </ul>
              <h4>项目成果</h4>
              <ul class="result-list">
                <li>
                  <span class="result-badge">变现</span>成功上线完整知识付费平台，实现知识变现闭环，可通过个人视频宣传、互联网搜索引流两种方式获取收入
                </li>
                <li>
                  <span class="result-badge">体验</span>前端交互流畅、响应高效，后端接口稳定，支付流程安全无异常，用户体验良好
                </li>
              </ul>
            </div>
          </div>

          <!-- P4 -->
          <div class="project">
            <div class="project-top">
              <h3>浙江省疾控中心智慧实验室系统 <span class="badge">前端工程师</span></h3>
              <span class="date">2024.09 - 2025.03</span>
            </div>
            <div class="project-body">
              <div class="tech-tags">
                <span class="tech-tag">React</span>
                <span class="tech-tag">Umi Max</span>
                <span class="tech-tag">Dva</span>
                <span class="tech-tag">TypeScript</span>
                <span class="tech-tag">Ant Design</span>
                <span class="tech-tag">Pro Components</span>
                <span class="tech-tag">Material UI</span>
              </div>
              <h4>项目背景</h4>
              <p>
                浙江省疾控中心需统一管理全省 17 个地市实验室业务，原有流程分散、效率低，需建设数字化智慧实验室系统。
              </p>
              <h4>我的职责</h4>
              <ul>
                <li>高效推进系统开发，严格对照API文档，完成界面搭建与业务功能落地，保障前后端数据交互顺畅</li>
                <li>承担部分页面重构任务，修复项目现存漏洞，优化代码结构与命名规范，提升项目可扩展性与可维护性</li>
                <li>抽离页面冗余配置进行全局统一处理，简化页面代码；编写精简通用的代码并添加规范注释，便于后续维护</li>
              </ul>
              <h4>项目成果</h4>
              <ul class="result-list">
                <li>
                  成功参与实现业务流程、资源管理、试剂管理、查询统计、系统管理等核心板块的部分界面与业务功能，保障系统正常运转和落地
                </li>
                <li>完成代码优化与BUG修复，规范代码命名，确保系统功能正常运行，显著提升项目可维护性与可扩展性</li>
                <li>
                  实现全省疾控实验室<strong>全流程数字化、线上化</strong>，统一数据标准，简化多级审批流程，<strong>大幅提升各级疾控工作效率与管理规范性</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 教育详情 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">🎓</div>
            <h2>教育详情</h2>
          </div>
          <div class="project">
            <div class="project-top">
              <h3>吉首大学张家界学院（本科）</h3>
              <span class="date">2023.09 ~ 2025.06</span>
            </div>
            <div class="project-body">
              <p>计算机科学与技术 · <strong>GPA：3.4/4.0</strong> · 排名：<strong>专业前 10%</strong></p>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 6px">
                C程序设计、数据结构与算法、计算机网络、计算机组成原理、编译原理、微机原理、操作系统、Python
                Web开发、Linux 操作系统应用、数据库原理、Vuejs企业级项目开发实战
              </p>
            </div>
          </div>
          <div class="project" style="margin-top: 12px">
            <div class="project-top">
              <h3>湖南软件职业技术学院（专科）</h3>
              <span class="date">2020.09 ~ 2023.06</span>
            </div>
            <div class="project-body">
              <p>软件技术（Web开发方向） · <strong>GPA：3.6/4.0</strong> · 排名：<strong>专业前 5%</strong></p>
              <p style="color: #94a3b8; font-size: 12px; margin-top: 6px">
                高等数学、Python程序设计、计算机与网络基础、软件工程与设计、HTML、CSS、JavaScript、jQuery、Bootstrap、SQL
                Server、Nodejs、Expressjs、MySQL、MongoDB、Linux系统基础
              </p>
            </div>
          </div>
        </div>

        <!-- 自我评价 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">⭐</div>
            <h2>自我评价</h2>
          </div>
          <div class="eval-grid">
            <div class="eval-card">
              <div class="emoji">📝</div>
              <div class="text">持续成长与技术分享<br />常活跃于 CSDN 和 GitHub 社区</div>
            </div>
            <div class="eval-card">
              <div class="emoji">🤝</div>
              <div class="text">强烈的责任心与合作精神<br />与他人一起做出更好的产品</div>
            </div>
            <div class="eval-card">
              <div class="emoji">✨</div>
              <div class="text">完美追求主义者<br />注重用户体验和代码质量</div>
            </div>
          </div>
        </div>

        <!-- 职业规划 -->
        <div class="section">
          <div class="section-head">
            <div class="section-icon">🌟</div>
            <h2>职业规划</h2>
          </div>
          <div class="career-box">
            持续自我提升学习大前端技术，向着 <strong>3D</strong> 和 <strong>AI</strong>
            方向发展，探索现实世界与虚拟世界的融合，推进现代化<strong>智慧城市</strong>数字化建设，成为一名优秀的前沿技术专家。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.resume-page {
  --dark: #0f172a;
  --dark-2: #1e293b;
  --dark-3: #334155;
  --slate: #475569;
  --gray: #94a3b8;
  --light: #f1f5f9;
  --light-2: #e2e8f0;
  --white: #ffffff;
  --cyan: #06b6d4;
  --cyan-light: #cffafe;
  --cyan-dark: #0891b2;
  --emerald: #10b981;
  --emerald-light: #d1fae5;
  --amber: #f59e0b;
  --amber-light: #fef3c7;
  --rose: #f43f5e;
  --violet: #8b5cf6;
  --violet-light: #ede9fe;
  font-family:
    'Inter',
    'Noto Sans SC',
    -apple-system,
    sans-serif;
  background: #e2e8f0;
  color: var(--dark);
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

#resume {
  width: 900px;
  background: var(--white);
  display: grid;
  grid-template-columns: 280px 1fr;
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 16px;
  overflow: hidden;
}

/* ==================== SIDEBAR ==================== */
.sidebar {
  background: linear-gradient(170deg, #0f172a 0%, #1e293b 60%, #0f172a 100%);
  color: #cbd5e1;
  padding: 44px 28px 36px;
  position: relative;
}

.sidebar::before {
  content: '';
  position: absolute;
  top: -120px;
  right: -120px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.avatar-area {
  text-align: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 42px;
  font-weight: 900;
  color: var(--white);
  letter-spacing: 2px;
  box-shadow:
    0 0 0 4px rgba(6, 182, 212, 0.25),
    0 8px 32px rgba(6, 182, 212, 0.2);
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-name {
  font-size: 28px;
  font-weight: 800;
  color: var(--white);
  letter-spacing: 4px;
  margin-bottom: 4px;
}

.avatar-role {
  font-size: 13px;
  color: var(--cyan);
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.sidebar-section {
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.sidebar-section:last-child {
  margin-bottom: 0;
}

.sidebar-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--cyan);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(6, 182, 212, 0.2);
}

.contact-list {
  list-style: none;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 12.5px;
  line-height: 1.5;
}

.contact-list li:last-child {
  margin-bottom: 0;
}

.contact-icon {
  width: 32px;
  height: 32px;
  background: rgba(6, 182, 212, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}

.contact-label {
  color: #64748b;
  font-size: 10px;
  display: block;
  margin-bottom: 1px;
}

.contact-value {
  color: #e2e8f0;
  font-weight: 500;
  word-break: break-all;
}

.skill-bar-group {
  margin-bottom: 14px;
}

.skill-bar-group:last-child {
  margin-bottom: 0;
}

.skill-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: #e2e8f0;
  margin-bottom: 6px;
}

.skill-bar-track {
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--cyan), var(--emerald));
  transition: width 1s ease;
}

.intention-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 12.5px;
}

.intention-item:last-child {
  border-bottom: none;
}

.intention-label {
  color: #64748b;
}

.intention-value {
  color: var(--white);
  font-weight: 600;
}

.edu-mini {
  margin-bottom: 16px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border-left: 3px solid var(--cyan);
}

.edu-mini:last-child {
  margin-bottom: 0;
}

.edu-mini .school {
  font-size: 13px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 4px;
}

.edu-mini .meta {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.6;
}

.edu-mini .meta strong {
  color: var(--cyan);
}

/* ==================== MAIN ==================== */
.main {
  padding: 44px 36px 36px;
  background: var(--white);
}

.section {
  margin-bottom: 30px;
}

.section:last-child {
  margin-bottom: 0;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-icon {
  width: 34px;
  height: 34px;
  background: linear-gradient(135deg, var(--cyan-light), #bae6fd);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.section-head h2 {
  font-size: 17px;
  font-weight: 800;
  color: var(--dark);
  letter-spacing: 0.5px;
}

.section-head::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--light-2), transparent);
}

/* advantages */
.advantages {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.adv-card {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--light-2);
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--dark-3);
  position: relative;
  overflow: hidden;
}

.adv-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.adv-card:nth-child(1) {
  background: #f0fdfa;
}

.adv-card:nth-child(1)::before {
  background: linear-gradient(90deg, var(--cyan), var(--emerald));
}

.adv-card:nth-child(2) {
  background: #faf5ff;
}

.adv-card:nth-child(2)::before {
  background: linear-gradient(90deg, var(--violet), #c084fc);
}

.adv-card:nth-child(3) {
  background: #fffbeb;
}

.adv-card:nth-child(3)::before {
  background: linear-gradient(90deg, var(--amber), #fb923c);
}

/* skills */
.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 14px;
  background: var(--light);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--dark-3);
  border: 1px solid transparent;
  transition: all 0.2s;
}

.skill-tag:hover {
  border-color: var(--cyan);
  background: var(--cyan-light);
  color: var(--cyan-dark);
}

.skill-detail {
  margin-top: 14px;
  font-size: 12px;
  line-height: 1.85;
  color: var(--slate);
  padding: 14px 16px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #f1f5f9;
}

/* projects */
.project {
  margin-bottom: 20px;
  border-radius: 14px;
  border: 1px solid #f1f5f9;
  overflow: hidden;
  transition:
    box-shadow 0.3s,
    border-color 0.3s;
}

.project:last-child {
  margin-bottom: 0;
}

.project:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border-color: var(--cyan-light);
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(90deg, #f8fafc, #f0fdfa);
  border-bottom: 1px solid #f1f5f9;
}

.project-top h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--dark);
}

.project-top .badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  margin-left: 10px;
  background: var(--cyan-light);
  color: var(--cyan-dark);
}

.project-top .date {
  font-size: 12px;
  color: var(--gray);
  font-weight: 500;
  white-space: nowrap;
}

.project-body {
  padding: 18px 20px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.tech-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 6px;
  background: var(--dark);
  color: var(--cyan);
}

.project-body h4 {
  font-size: 13px;
  font-weight: 700;
  color: var(--dark);
  margin: 12px 0 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.project-body h4::before {
  content: '';
  width: 4px;
  height: 14px;
  background: var(--cyan);
  border-radius: 2px;
  flex-shrink: 0;
}

.project-body p {
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--slate);
  margin-bottom: 4px;
}

.project-body ul {
  list-style: none;
  padding: 0;
}

.project-body ul li {
  position: relative;
  padding-left: 16px;
  font-size: 12.5px;
  line-height: 1.85;
  color: var(--dark-3);
  margin-bottom: 2px;
}

.project-body ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  background: var(--cyan);
  border-radius: 50%;
}

.result-list li::before {
  background: var(--emerald) !important;
}

.result-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 4px;
  background: var(--emerald-light);
  color: #047857;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* evaluation */
.eval-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

.eval-card {
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #f1f5f9;
}

.eval-card .emoji {
  font-size: 24px;
  margin-bottom: 8px;
}

.eval-card .text {
  font-size: 12px;
  line-height: 1.7;
  color: var(--slate);
}

/* career */
.career-box {
  padding: 20px 24px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 14px;
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.9;
  position: relative;
  overflow: hidden;
}

.career-box::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%);
}

.career-box strong {
  color: var(--cyan);
}
</style>
