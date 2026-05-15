<template>
  <section class="hero-container">
    <h2 class="heading">
      <slot name="heading" />
    </h2>
    <div class="content">
      <slot name="content" />
    </div>
  </section>
</template>

<style scoped lang="css">
.hero-container {
  padding: 64px 64px 24px;

  .heading {
    text-align: center;
    font-size: 1.625rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .content {
    max-width: 1152px;
    margin: 0 auto;
  }
}


@media (max-width: 1200px) {
  .hero-container {
    padding: 48px;

    .heading {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 640px) {
  .hero-container {
    padding: 24px;

    .heading {
      font-size: 1rem;
    }
  }
}
</style>
