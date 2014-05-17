[
    '{{repeat(35, 5)}}', {
        id: '{{index()}}',
        guid: '{{guid()}}',
        checkedIn: '{{bool()}}',
        picture: 'http://placehold.it/32x32',
        age: '{{integer(20, 40)}}',
        name: '{{firstName()}} {{surname()}}',
        gender: '{{gender()}}',
        email: '{{email()}}',
        phone: '{{phone()}}',
        userType: 'volunteer',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, CO, {{integer(100, 10000)}}',
        latitude: '{{floating(40.398856, 39.683940)}}',
        longitude: '{{floating(-105.650024, -104.677734)}}'

    }
]