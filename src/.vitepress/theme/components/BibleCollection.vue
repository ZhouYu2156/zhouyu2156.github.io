<script setup lang='ts'>
import { ref } from 'vue';
const poetries = ref([
    {
        id: 1,
        title: '世经',
        children: [
            '天为乾，地为坤。天地乾坤，无极之道。男为阳，女为阴。取长补短，百毒不侵。山为高，洼为低。山托洼间，地势蜿蜒。若非天地万物之存，吾辈可得安生？若非男女刚柔之抵，吾岂不性泯于人？若非高山低谷之填，土木简室可得置乎？故曰：天地万物，相生相克；人始于爱，亦终于爱。情能动人，而人可不动情，此之谓单受而否相受，亦所回灾之法。',
            '洪荒宙宇，俯首瞰之。维跃其间，思放万里。重审事物，皆淡易处。若困厄之，智梏难除。凡不能度，用反难易。尘世常物，执易解之。学术研考，难破宏观。',
            '度有两性，一谓良性，二谓极端。过之中性，则引祸至身；不半之，为低端极性，亦招损；左右中性，可得契机。',
            '神定天府，命运渊宇。浮生若梦，醒时皆空。淡视旁物，安度一生。既醒之时，于世无悔。',
            '天玄地机，氤氲卧藏。维参不衔，故所不显。无中造物，物可遁空。眼见世物，皆为低度。隐物难察，是为高维。凡思不知，皆为实存。',
            '前世因，今世缘，后世果；前世不欠，今世不见，后世不厌；缘起缘缔，缘销缘灭，前世今生；前世回眸，今世擦肩，来世有成；若爱钻一，不爱不意，甚高境观。',
            '生性迷恋，红尘周遭，梦境捣碎，皆为遁空。人间纵好，已伏却了。时未到，不言告，待开窍，终成笑。何为缘来缘往，独自伤悲较。只管他，大事小事撒手撂。',
            '世间万物，生于镜像，归于虚空。若求实境，无即是真，真即无象。凡所求者，皆为自扰；待灾既降，荡然无存。心固难溢，背道驰行，终不得善。',
            '灵感不定，思潮起伏，尘世点点，皆朝我阙。谬世洪荒，竟此流连，若问何为，直是正名。',
            '自然法则，顺变则存，逆反则弃。行法矩规，言出深思，虑择多方。然后持执，则万事合乎道哉。',
            '空极见色，色即是空。法理无常，信则还有，疑之为无。信疑何取，皆为自以；万事万物，异竟无有，谁人知得？',
            '人间甚美，常有不足；悲欢痛欲，喜乐交融。时感失意，时见有望；人生几何，终成土灰。笑脸常开，好彩自来；何计那般，区区尘事。',
            '书海有涯，思象苍穹。才源涸竭，以书填补；才源丰溢，提笔著书。学产相馈，再得菁华。',
        ]
    },

])

</script>

<template>
    <div v-for="item in poetries" :key="item.id" class="poetry-wrapper">
        <h2>{{ item.title }}</h2>
        <div class="poetry-content">
            <div v-for="(photograph, index) in item.children" :key="index">
                <p>
                    {{ photograph }}
                </p>
                <hr>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.poetry-wrapper {
    border-bottom: 1px solid var(--vp-c-divider);

    >h2 {
        text-align: center;
        color: #0000;
        background-clip: text;
        margin: 0 auto;
        border-top-color: transparent;
        background-image: linear-gradient(to right, #09c8ce, #eb2f96);
    }
}

.poetry-content {
    padding: 5px;

    >div {
        text-indent: 2em;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 20px;
        text-align: left;
    }
}
</style>