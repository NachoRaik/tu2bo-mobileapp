export const MY_VIDEOS = [
  {
    id: 1,
    author: 'author 1',
    user_id: 1,
    title: 'a title',
    description: 'a descrption',
    date: '2019-01-02',
    visibility: 'private',
    url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumb:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    likes: 100000
  }
];

export const PROFILE = {
  username: 'aUsername',
  image: 'anImageUrl.com',
  first_name: 'aName',
  last_name: 'aLastName',
  email: 'email@host.com',
  user_info: {
    //this may not come if it is the same user
    is_friend: true
  }
};

export const REQUESTS = [
  {
    id: 1,
    username: 'aUsername'
  },
  {
    id: 2,
    username: 'anotherUsername'
  }
];
