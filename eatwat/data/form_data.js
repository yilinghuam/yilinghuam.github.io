const category = [
    'Cafe',
    'Chinese',
    'Dessert',
    'English',
    'Fast Food',
    'French',
    'Halal',
    'Italian',
    'Japanese',
    'Mexican',
    'Spanish',
    'Thai',
    'Vietnamese'
]

const ratings = {
    '1':'&#xf005;1',
    '2':'&#xf005;&#xf005;2',
    '3':'&#xf005;&#xf005;&#xf005;3',
    '4': '&#xf005;&#xf005;&#xf005;&#xf005;4',
    '5': '&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;5',
}

const price = {
    "1":'$',
    "2":'$$',
    "3":'$$$',
    "4":'$$$$',
    "5":'$$$$$'
}
let data = {
    category,
    ratings,
    price
}

console.log(data)
module.exports = {
    category,
    ratings,
    price
}

