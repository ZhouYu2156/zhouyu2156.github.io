<script setup></script>

<template>
  <div class="display-center">
    <table>
      <thead>
        <tr>
          <th style="text-align: center">名称</th>
          <th style="text-align: center">符号</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center">算术右移</td>
          <td style="text-align: center">
            <code> &gt;&gt; </code>
          </td>
        </tr>
        <tr>
          <td style="text-align: center">逻辑右移</td>
          <td style="text-align: center">
            <code> >>> </code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
$center: center;

.display-center {
  display: flex;
  justify-content: center;

  table {
    border-radius: 5px;
  }
}
</style>
