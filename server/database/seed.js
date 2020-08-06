const db = require('./db.js');
const moment = require('moment');

const reviewDescriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum imperdiet metus, ac imperdiet libero. Suspendisse scelerisque nisi sit amet neque suscipit', 'vulputate viverra ex sagittis. Aenean sed convallis augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae', 'Nam ullamcorper augue id massa consequat feugiat. Aliquam id elementum nisl, ut aliquet est. Ut porta nec arcu ac sodales.','Donec suscipit feugiat tortor, et tristique ex convallis id. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed gravida eros sodales sodales luctus.', 'Sed id elit ac libero viverra semper eget id erat. Maecenas at aliquam elit. Morbi et aliquam sapien. Proin imperdiet placerat vehicula.', 'Pellentesque mollis gravida pharetra. Praesent imperdiet elit cursus leo viverra tempus. Nunc in fringilla ligula. Sed ultricies nibh mi, vitae facilisis dolor fermentum vulputate. In sagittis tincidunt laoreet.', 'Nunc non ultricies ipsum. Curabitur at quam elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed nunc dui. Duis tristique, risus at ornare eleifend', 'ex justo eleifend nunc, a bibendum dolor ante non sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 'Maecenas convallis sem est, vel dignissim augue commodo non. Cras mi velit, lacinia eget malesuada at, commodo euismod lectus.', 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas non ex vitae risus malesuada feugiat. Duis ac nulla lobortis, laoreet ante tincidunt, rutrum massa.'];

const usernames = ['rubberyfrantic', 'hankeringdispatch', 'skierlevers', 'quarterdeckbart', 'vowedpneumonia', 'charcoalserjeant', 'headbandtuolumne', 'whamlacombe', 'attendherbs', 'measurestire', 'lashedcrowded', 'quicklimevictory', 'boundedmullet', 'abaftintranets', 'basischildren', 'milkshakesfunction', 'jollybroil', 'yeahllynfi', 'auspiciousamino', 'bipingways', 'drateworthy', 'bubbedgrubble', 'myselfgoods', 'potablecollagen', 'tabletpointers', 'BenChasin', 'RyanZigler', 'EvanKolb', 'StevenTrager', 'kongaiwen'];

const userdescriptions = ['Globetrotter', 'Avid Traveller', 'Novice Nomad'];

const userages = [1, 2, 3, 4];

const seedDB = () => {
  seedHostels(() => {
    seedUsers(() => {
      seedReviews(() => {
        console.log('DB seeded');
      })
    })
  })
};

const seedUsers = (callback) => {
  let count = 0;
  for (let i = 0; i < 30; i++) {
    let name = usernames[i];
    let ageIdx = Math.floor(Math.random() * 4);
    let age = userages[ageIdx];
    let descIdx = Math.floor(Math.random() * 3);
    let desc = userdescriptions[descIdx];
    let imgIdx = Math.ceil(Math.random() * 5);
    let img = `server/database/images/img${imgIdx}.jpg`;
    let queryStr = `INSERT INTO authors (description, name, age_group, picture_url) VALUES ("${desc}", "${name}", "${age}", "${img}")`;
    db.connection.query(queryStr, (err, res) => {
      if (err) {
        console.log('ERROR IN AUTHOR SEEDING', err);
      } else {
        count === 29 ? callback() : count++;
      }
    });
  }
};

const seedHostels = (callback) => {
  let count = 0;
  for (let i = 1; i <= 100; i++) {
    let queryStr = `INSERT INTO hostels (hostel_name) VALUES ("Hostile${i}")`;
    db.connection.query(queryStr, (err, res) => {
      if (err) {
        console.log('ERROR IN HOSTEL SEEDING', err);
      } else {
        count === 99 ? callback() : count++;
      }
    });
  }
};

const seedReviews = (callback) => {
  let count = 0;
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 30; j++) {
      let hostelId = i;
      let authorId = j;
      let desc = reviewDescriptions[Math.floor(Math.random() * 10)];
      let security = Math.ceil(Math.random() * 10);
      let location = Math.ceil(Math.random() * 10);
      let staff = Math.ceil(Math.random() * 10);
      let atmosphere = Math.ceil(Math.random() * 10);
      let cleanliness = Math.ceil(Math.random() * 10);
      let facilities = Math.ceil(Math.random() * 10);
      let value = Math.ceil(Math.random() * 10);
      let total = (security + location + staff + atmosphere + cleanliness + facilities + value) / 7;
      let randDate = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
      let date = moment(randDate).format('YYYY-MM-DD');
      let queryStr = `INSERT INTO reviews (hostel_id, author_id, description, security, location, staff, atmosphere, cleanliness, facilities, value, total, created_at) VALUES ("${hostelId}", "${authorId}", "${desc}", "${security}", "${location}", "${staff}", "${atmosphere}", "${cleanliness}", "${facilities}", "${value}", "${total}", "${date}")`;
      db.connection.query(queryStr, (err, res) => {
        if (err) {
          console.log('ERROR IN REVIEWS SEEDING', err);
        } else {
          count === 2999 ? callback() : count++;
        }
      })
    }
  }
};
