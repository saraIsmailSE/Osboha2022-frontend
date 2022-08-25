import User from '../../Model/User'
import Message from '../../Model/Message'

export const Users = [
  new User({ id: 1, name: 'Team Discussions',  isPrivate: true, image: require('../../assets/images/user/user-1.jpg'), isActive: true }),
  new User({ id: 2, name: 'Designer',  image: require('../../assets/images/user/07.jpg'), isActive: false }),
  new User({ id: 3, name: 'Announcement', isPrivate: true, image: require('../../assets/images/user/06.jpg'), isActive: true }),
  new User({ id: 4, name: 'Developer', image: require('../../assets/images/user/user-4.jpg'), isActive: true }),
  new User({ id: 5, name: 'Testing Team', image: require('../../assets/images/user/user-5.jpg'), isActive: false }),
  new User({ id: 6, name: 'Paul Molive', image: require('../../assets/images/user/user-6.jpg'), isActive: true }),
  new User({ id: 7, name: 'Paige Turner', image: require('../../assets/images/user/05.jpg'), isActive: false }),
  new User({ id: 8, name: 'Barb Ackue',  image: require('../../assets/images/user/06.jpg'), isActive: true }),
  new User({ id: 9, name: 'Maya Didas',  image: require('../../assets/images/user/07.jpg'), isActive: false }),
  new User({ id: 10, name: 'Monty Carlo', image: require('../../assets/images/user/08.jpg'), isActive: true })
]

export const MessagesUser1 = [
  new Message({ body: 'How can we help? We\'re here for you! 😄', userId: 5, me: true, time: '6:45' }),
  new Message({ body: 'Okay Thanks...', userId: 5, me: true, time: '7:20' })
]

// export const MessagesUser2 = [
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message()
// ]

// export const MessagesUser3 = [
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message()
// ]
// export const MessagesUser4 = [
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message(),
//   new Message()
// ]
