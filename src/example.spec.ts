class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const index = this.friends.indexOf(name);
    if (index === -1) throw new Error('Friend is not found');
    this.friends.splice(index, 1);
  }
}

// tests
describe('FriendsList', () => {
  let friendsList;

  // runs before each 'it' case. I declare what every one of them have in common, to reuse the code.
  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes frinds list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('adds a friend to the list', () => {
    friendsList.addFriend('Ariel');

    expect(friendsList.friends.length).toEqual(1);
  });

  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn(); // mock function (keep track of this function call and params passed)

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Ariel');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Ariel');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Ariel');
      expect(friendsList.friends[0]).toEqual('Ariel');
      friendsList.removeFriend('Ariel');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Ariel').toThrow(Error));
    });
  });
});
