const category = {
    'Cafe': 'Cafe',
    'Chinese': 'Chinese',
    'Dessert': 'Dessert',
    'English': 'English',
    'Fast Food': 'Fast Food',
    'French': 'French' ,
    'Halal': 'Halal',
    'Italian': 'Italian',
    'Japanese': 'Japanese',
    'Mexican': 'Mexican',
    'Spanish': 'Spanish',
    'Taiwanese': 'Taiwanese',
    'Thai': 'Thai',
    'Vietnamese': 'Vietnamese'
}

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

