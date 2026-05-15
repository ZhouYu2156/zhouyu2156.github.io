<template>
  <div class="card-wrapper">
    <slot />
  </div>
</template>

<style scoped lang='css'>
.card-wrapper {
  min-width: 324px;
  min-height: 324px;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 1.5rem;
  /* z-index: 50; */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  transform: translateY(0px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px 0px rgba(0, 0, 0, 0.2);
  }
}

html.dark .card-wrapper {
  background-color: #1e202a;
  box-shadow: 0 0 15px 3px rgba(33, 44, 74, 0.8);
  border: 1px solid rgba(59, 130, 246, .4);

  &:hover {
    box-shadow: 0 0 36px 5px rgba(59, 130, 246, .2), 0 0 24px 3px rgba(59, 130, 246, .28), 0 0 14px 1px rgba(59, 130, 246, .4), 0 0 8px rgba(59, 130, 246, .55), 0 8px 24px rgba(0, 0, 0, .45);
  }
}
</style>