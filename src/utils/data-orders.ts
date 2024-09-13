export type OrderIngredientType = {
  image: string
  name: string
  count: number
  price: number
}
export type OrderType = {
  id: string
  time: string
  name: string
  status: 'Создан' | 'Готовится' | 'Выполнен'
  ingredients: OrderIngredientType[]
  price: number
}

const bunImages: [string, string] = [
  'https://code.s3.yandex.net/react/code/bun-02.png',
  'https://code.s3.yandex.net/react/code/bun-01.png'
]

const sauceImages: [string, string] = [
  'https://code.s3.yandex.net/react/code/sauce-01.png',
  'https://code.s3.yandex.net/react/code/sauce-02.png'
]

const meatImages: [string, string, string, string, string, string, string, string, string] = [
  'https://code.s3.yandex.net/react/code/meat-01.png',
  'https://code.s3.yandex.net/react/code/meat-02.png',
  'https://code.s3.yandex.net/react/code/meat-03.png',
  'https://code.s3.yandex.net/react/code/meat-04.png',
  'https://code.s3.yandex.net/react/code/meat-05.png',
  'https://code.s3.yandex.net/react/code/meat-06.png',
  'https://code.s3.yandex.net/react/code/meat-07.png',
  'https://code.s3.yandex.net/react/code/meat-08.png',
  'https://code.s3.yandex.net/react/code/meat-09.png'
]

export const orders: OrderType[] = [
  {
    id: '034535',
    time: '2024-09-12T16:20:32.877Z',
    name: 'Death Star Starship Main бургер',
    status: 'Создан',
    ingredients: [
      {
        image: bunImages[0],
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20
      },
      {
        image: sauceImages[0],
        name: 'Филе Люминесцентного тетраодонтимформа',
        count: 1,
        price: 300
      },
      {
        image: sauceImages[1],
        name: 'Соус традиционный галактический',
        count: 1,
        price: 30
      },
      {
        image: meatImages[1],
        name: 'Плоды фалленианского дерева',
        count: 1,
        price: 80
      }
    ],
    price: 480
  },
  {
    id: '034534',
    time: '2024-09-12T13:20:32.877Z',
    name: 'Interstellar бургер',
    status: 'Готовится',
    ingredients: [
      {
        image: bunImages[0],
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20
      },
      {
        image: sauceImages[0],
        name: 'Филе Люминесцентного тетраодонтимформа',
        count: 1,
        price: 300
      },
      {
        image: sauceImages[1],
        name: 'Соус традиционный галактический',
        count: 1,
        price: 30
      }
    ],
    price: 560
  },
  {
    id: '034533',
    time: '2024-09-11T13:50:32.877Z',
    name: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    ingredients: [
      {
        image: bunImages[0],
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20
      },
      {
        image: meatImages[1],
        name: 'Плоды фалленианского дерева',
        count: 1,
        price: 80
      }
    ],
    price: 510
  },
  {
    id: '034532',
    time: '2024-09-10T21:53:32.877Z',
    name: 'Supernova Infinity бургер',
    status: 'Выполнен',
    ingredients: [
      {
        image: bunImages[0],
        name: 'Флюоресцентная булка R2-D3',
        count: 2,
        price: 20
      },
      {
        image: sauceImages[0],
        name: 'Филе Люминесцентного тетраодонтимформа',
        count: 1,
        price: 300
      },
      {
        image: sauceImages[1],
        name: 'Соус традиционный галактический',
        count: 1,
        price: 30
      }
    ],
    price: 370
  }
]
