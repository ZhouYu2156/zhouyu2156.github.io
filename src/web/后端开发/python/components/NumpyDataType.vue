<script setup lang='ts'>
import { ref } from 'vue'
const rows = ref([
    ['np.bool_', '', '布尔型数据类型（True 或者 False）'],
    ['np.int_', '', '默认的整数类型(类似于C语言中的 long、int32 或者 int64)'],
    ['np.intc', '', '与 C 的 int 类型一样，一般是 int32 或者 int64'],
    ['np.int8', 'i1', '字节(-128 to 127)'],
    ['np.int16', 'i2', '整数(-32768 to 32767)'],
    ['np.int32', 'i4', '整数(-2147483648 to 2147483647)'],
    ['np.int64', 'i8', '整数(-9223372036854775808 to 9223372036854775807)'],
    ['np.uint8', 'u1', '无符号整数(0 to 255)'],
    ['np.uint16', 'u2', '无符号整数(0 to 65535)'],
    ['np.uint32', 'u4', '无符号整数(0 to 4294967295)'],
    ['np.uint64', 'u8', '无符号整数(0 to 18446744073709551615)'],
    ['np.float_', '', 'float64类型的简写'],
    ['np.float16', 'f2', '半精度浮点数'],
    ['np.float32', 'f4 或 f', '单精度浮点数'],
    ['np.float64', 'f8 或 d', '双精度浮点数'],
    ['np.complex_', '', ''],
    ['np.complex64', 'c8', '复数，表示双32位浮点数(实数部分和虚数部分)'],
    ['np.complex128', 'c16', '复数，表示双64位浮点数(实数部分和虚数部分)'],
    ['np.string_', 'S', 'ASCII字符串，例如：S7 表示长度为 7 的ASCII字符串'],
    ['np.unicode_', 'U', 'Unicode字符串，例如： U5 表示长度为 8 的 Unicode 编码字符串'],
])
</script>

<template>
    <table class="table table-success table-striped table-hover">
        <thead>
            <tr>
                <th class="text-center">numpy数据类型</th>
                <th class="text-center">类型代码</th>
                <th class="text-center">描述</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row, index in rows" :key="index">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang='scss'></style>