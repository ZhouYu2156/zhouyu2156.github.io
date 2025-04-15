// #region objectExpand
let t1 = {
    name: "jack",
    age: 18,
}
let t2 = { ...t1 }
console.log(t2)
// #endregion objectExpand


// #region arrayExpand
let arr = [1, 2, 3, 4, 5]
let arr_copy = [...arr]
console.log(arr1)
// #endregion arrayExpand


// #region objectSimpleDeconstruct
let obj1 = { myname: 'rose', age: 18 }
let { myname, age } = obj1
console.log(myname, age)
// #endregion objectSimpleDeconstruct


// #region arraySimpleDeconstruct
let arr1 = [9, 8, 7, 6, 5]
let [p1, p2, p3, p4, p5] = arr1
// #endregion arraySimpleDeconstruct


// #region objectComplexDeconstruct
let complexObject = {
    user: {
        username: 'john',
        age: 18,
        desc: {
            addr: 'England',
            phone: '488-322-101'
        }
    },
    other: 'none'
}
let { user: { desc: { addr, phone } } } = complexObject
console.log(addr, phone)
// #endregion objectComplexDeconstruct


// #region arrayComplexDeconstruct
let complexArray = [
    {
        school: 'Harvard',
        time: '2023/1/28',
        students: [
            {
                username: '小红',
                age: 20,
                aunt: '马什么冬梅'
            },
            {
                username: '小明',
                age: 22,
                aunt: '杰克逊',
                phone1: '123456789'
            },
            {
                username: '灰太狼',
                age: 26,
                child: '小灰灰',
                phone2: '400-100-122'
            }
        ]
    }
]
let [
    {
        /**
         * 通过 ,（逗号）来跳过一个项目从而获取我们想要的目标对象并对其进行解构赋值
         */
        students: [, , { phone2, child }]
    }
] = complexArray
console.log(phone2, child)
// #endregion arrayComplexDeconstruct


// #region dotchain
function axios(options) {
    console.log(options?.method)
    console.log(options?.url)
    console.log(options?.data)
}
// #endregion dotchain


// #region functionCoriolization
const handleClick = (event, name1, name2) => console.log(event, name1, name2)
const callback = (e) => handleClick(e, 'jack', 'rose')
// #endregion functionCoriolization


// #region and
// &&：全真则返回后面的值
const and = !0 && 'active'
console.log(and)
// #endregion and


// #region or
// ||：遇到真值则返回该值
const or = null || 3
console.log(or)
// #endregion or


// #region not
// !：将后面的值对应的布尔值取反
const not = !undefined
console.log(not)
// #endregion not


// #region shiftbit1
/**
 * [5]原码 = 0000 0101
 * [-5]原码 = 1000 0101
 * [-5]补码 = 1111 1011   >> 2
 * => 1111 1110 (移位后的补码形式, 负数高位补 1)
 * => 1000 0010 (还原成的原码形式) = -2
*/
const arithmeticShift = -5 >> 2
console.log(arithmeticShift)
// #endregion shiftbit1


// #region shiftbit2
/**
 * [5]原码 = 0000 0101
 * [-5]原码 = 1000 0101
 * [-5]补码 = 1111 1011   >>> 2
 * => 0011 1110 (移位后的补码形式, 高位补 0)
 * => 0011 1110 (还原成的原码形式)
 * => 2+4+8+16+32=62
*/
const logicalShift = -5 >> 2
console.log(logicalShift)
// #endregion shiftbit2


// #region xor
/**
 * [2]补码 = 0000 0010
 * [3]补码 = 0000 0011
 * 2 ^ 3 = 0000 0010 ^ 0000 0011
 *       ↓
 *   0000 0010
 * ^ 0000 0011
 * -------------
 *   0000 0001      =>      1
 */
console.log(2 ^ 3); // 结果: 1
// #endregion xor














