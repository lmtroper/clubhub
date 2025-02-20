let mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

let config = {
    host    : process.env.REACT_APP_DB_HOST,
	port    : process.env.REACT_APP_DB_PORT,
    user    : process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DATABASE
};

var admin = require("firebase-admin");

const serviceAccount = JSON.parse(
	process.env.REACT_APP_FIREBASE
);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.json());

app.use((req, res, next) => {
	if (req.headers.origin?.includes('://clubhub.lmtroper.dev')) {
		res.header('Access-Control-Allow-Origin', req.headers.origin)
		res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	}
	next()
})

app.use(decodeIDToken);
async function decodeIDToken(req, res, next) {
	if (req.headers?.authorization?.startsWith('Bearer ')) {
		const idToken = req.headers.authorization.split('Bearer ')[1];

		try {
			const decodedToken = await admin.auth().verifyIdToken(idToken);
			req['currentUser'] = decodedToken;
		} catch (err) {
			console.log(err);
		}
	}
	next();
}

app.put('/api/login', (req, res) => {

	const user = req['currentUser'];

	if (!user) {
		res.status(403).send('You are not logged in');
	} else {
		// Initialize connection to db
		let connection = mysql.createConnection(config);

		// SQL Query to upsert user in database
		const {uid, name, email} = user;

		console.log(`User: ${name} logged in`);
		
		const sql =
		`
		INSERT INTO users (uid, name, email)
		VALUES (?, ?, ?)
		ON DUPLICATE KEY 
		UPDATE name = ?, email = ?;
		`;
		const data = [uid, name, email, name, email]

		connection.query(sql, data, (error, results, fields) => {
			if (error) {
				res.status(500).send('could not make database request');
				return console.error(error.message);
			}
			res.status(201).send('Logged in, user updated');
		})
		connection.end();

	}
}
)

app.post('/api/getClubs', (req, res) => {
	let connection = mysql.createConnection(config)
	let clubID = req.body.clubID

	const sql = `SELECT *
	FROM clubs
	WHERE clubs.id = ?`;

	const data = [clubID]

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getClubAnnouncements', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;

	const sql = `SELECT a.title, a.body, a.time_posted, a.id, a.visibility, a.placeholder_photo, a.time_posted_text
	from announcements as a, clubs as c 
	where c.id = a.club_id and c.id = ?
	order by time_posted desc;`;

	const data = [clubID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();


});

app.post('/api/getSpecificClubAnnouncements', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubs = req.body.clubs;
	// const data = clubs.join(', ');

	const sql = `
	SELECT
	clubs.name,
	a.title,
	a.body,
	a.time_posted,
	a.id,
	a.visibility,
	clubs.id AS club_id,
	a.placeholder_photo,
	a.time_posted_text
	FROM announcements a
	JOIN clubs ON a.club_id = clubs.id
	WHERE a.club_id IN (${clubs.map(() => '?').join(', ')})
	ORDER BY a.time_posted DESC;`;

	const data = clubs;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();


});

app.post('/api/postAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcement = req.body;

    let sql = `INSERT into announcements (club_id, title, body, time_posted, visibility, placeholder_photo, time_posted_text)
	values(?,?,?,?,?,?,?)`
    let data = [
		announcement.clubID, 
		announcement.title, 
		announcement.body, 
		announcement.time_posted, 
		announcement.visibility, 
		announcement.placeholderImage,
		announcement.time_posted_text];

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
})

app.post('/api/deleteAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcementID = req.body.id;

    let sql = `DELETE FROM announcements where id = ?`

	const data = [announcementID]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results)
		res.send({ express: string });
	});
	connection.end();

})

app.post('/api/editAnnouncement', (req, res) => {
    let connection = mysql.createConnection(config);
    let announcementID = req.body.id;
	let newTitle = req.body.newTitle;
	let newBody = req.body.newBody;
	let visibility = req.body.visibility;
	let placeholder_photo = req.body.placeholderImage;

    let sql = `UPDATE announcements
	SET title = ?, body = ?, visibility= ?, placeholder_photo = ?
	WHERE id = ?`

	const data = [newTitle, newBody, visibility, placeholder_photo, announcementID]

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

})

app.post('/api/getClubMembers', (req,res) => {

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;

	let sql = `SELECT u.name, m.role, u.uid
	FROM memberships as m, users as u 
	WHERE m.club_id= ? and m.uid = u.uid
	order by role desc;`;

	const data = [clubID]

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

});

app.post('/api/getCurrentUserRole', (req,res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;
	let clubID = req.body.clubID;

	let sql = `SELECT role FROM memberships WHERE club_id = ? and uid = ?`;

	const data = [clubID, userID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

});

app.post("/api/acceptUser", async (req, res) => {
	const currentUser = req["currentUser"];
	const user = req.body["user"];
	const clubID = req.body["clubID"];
  
	if (!user) {
	  return res.status(400).send("No user provided");
	}
  
	// Check if is admin/owner of this club
	const admin = await isAdmin(currentUser, clubID);
	if (!admin.status) {
	  return res.status(400).send(admin.message);
	}
  
	let connection = mysql.createConnection(config);
	const query = `
	  UPDATE memberships
	  SET role="user"
	  WHERE uid=? AND club_id=?
	  `;
	const data = [user.uid, clubID];
  
	connection.query(query, data, (error, results, fields) => {
	  if (error) {
		// Return an error if the query failed
		res.status(500).send(error.message);
	  } else {
		// Return a success message
		res.status(200).send(`User ${user.name} accepted to club`);
	  }
	});
	connection.end();
  });
  
  app.delete("/api/denyUser", async(req, res) => {
	let connection = mysql.createConnection(config);
	const currentUser = req["currentUser"];
	const user = req.body["user"];
	const clubID = req.body["clubID"];
  
	if (!user) {
	  return res.status(400).send("No user provided");
	}
  
	// Check if is admin/owner of this club
	const admin = await isAdmin(currentUser, clubID);

	if (!admin.status) {
	  return res.status(400).send(admin.message);
	}
	// delete membership record
	const query = `
	  DELETE FROM memberships
	  WHERE uid=? AND club_id=?`;

	const data = [user.uid, clubID];
  
	connection.query(query, data, (error, results, fields) => {
	  if (error) {
		// Return an error if the query failed
		res.status(500).text(error.message);
	  } else {
		// Return a success message
		res.status(200).send(`User ${user.name} denied from club`);
	  }
	});
	connection.end();
  });
  
  async function isAdmin(user, clubID) {
	let connection = mysql.createConnection(config);  
	return new Promise((resolve, reject) => {
	let response = {status: false, message: "Unknown error"};
	if (!user) {
	  response = { status: false, message: "No user provided" };
	  resolve(response);
	}	  
	// Check if user is an admin or owner of the club
	const adminQuery = `
	  SELECT role
	  FROM memberships
	  WHERE uid=? AND club_id=? AND (role="admin" OR role="owner")
	  `;
	connection.query(adminQuery, [user.uid, clubID], (error, results) => {
	  if (error) {
		console.error(error.message);
		response = { status: false, message: error.message };
		}
	  if (!results.length > 0) {
		console.log("user is not admin")
		response = {
		  status: false,
		  message: "User is not an admin or owner of the club",
		};
	} else {
		  console.log("user is admin")
		  response = {
			  status: true,
			  message: "User is an admin or owner of the club",
			};
	}
	resolve(response)
	});
	connection.end();
  })};


app.get('/api/getAllClubs', (req, res) => {
	let connection = mysql.createConnection(config)
	console.log(connection)
	const query = `SELECT * FROM clubs`;

	connection.query(query, (error, results, fields) => {
	  if (error) {
		// Return an error if the query failed
		res.status(500).json({ error: error.message });
	  } else {
		// Return the results as JSON
		let string = JSON.stringify(results);
		res.setHeader('Content-Type', 'application/json');
		res.send({express: string});
		//res.send( results);
	  }
	});
	connection.end();
});

app.post('/api/checkMembership', (req,res) => {

	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `select club_id, role from memberships where uid = ?`;

	const data = [userID];
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();


});

app.post('/api/joinClub', async (req,res) => {
	let data = req.body;

	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let userID = req.body.userID;

	const applicationType = await getApplicationType(clubID)
	if (!applicationType.status) {
		let string = JSON.stringify('Error')
		return res.status(400).send({express: applicationType.message});
	}
	const acceptAll = !applicationType.data["hold_applications"];

	const role = acceptAll ? "user" : "pending";

	let sql = `insert into memberships(uid, club_id, role)
	values(?, ?, ?)`;

	const values = [userID, clubID, role];
	
	connection.query(sql, values, (error, results, fields) => {
        if (error) {
            connection.query(`ROLLBACK`, (error, results, fields) => {
                let string = JSON.stringify('Error')
                res.send({ express: string });
            });
        } else {
            connection.query(`COMMIT`, data, (error, results, fields) => {
                let string = JSON.stringify(acceptAll ? 'Success' : 'Pending')
                res.send({ express: string });            
			})};
    })

	connection.end();
});


app.post('/api/editClubDescription', (req, res) => {
	let connection = mysql.createConnection(config);
	const clubId = req.body.id;
  	const newDescription = req.body.description;

	const sql = `UPDATE clubs SET description = ? WHERE id = ?`;

	const data = [newDescription, clubId];

	connection.query(sql, data, (err, result) => {
		if (err) throw err;
		let string = JSON.stringify(result);
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getMyClubs', (req,res) => {

	let connection = mysql.createConnection(config);

	let userID = req.body.userID;
	console.log(userID);

	sql = `SELECT clubs.id, clubs.name, clubs.description, clubs.categories FROM clubs
	JOIN memberships ON
	clubs.id = memberships.club_id
	AND memberships.uid = ?
	WHERE memberships.role = 'owner' OR memberships.role = 'admin' OR memberships.role = 'user'`;
	
	const data = userID;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getAnnouncements', (req,res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT clubs.name, a.title, a.body, a.time_posted, a.id, a.visibility, memberships.role, clubs.id club_id, a.placeholder_photo, a.time_posted_text from announcements a
	INNER JOIN memberships on memberships.club_id = a.club_id
	INNER JOIN clubs on clubs.id = memberships.club_id
	WHERE memberships.uid = ?
	AND memberships.role != 'pending'
	AND DATE(a.time_posted) >= DATE(DATE_SUB(NOW(), INTERVAL 1 WEEK))`;
	console.log("userID: " + userID)
	const data = userID

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getDashboardEvents', (req,res) => {
	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `SELECT clubs.name, e.club_id, e.title, e.id, e.location, e.start_time, e.end_time, e.body, e.price, e.allDay, e.placeholder_photo, e.start_time_text, e.end_time_text, memberships.role, clubs.id club_id  from events e
	INNER JOIN memberships on memberships.club_id = e.club_id
	INNER JOIN clubs on clubs.id = memberships.club_id
	WHERE memberships.uid = ?
	AND DATE(e.start_time) >= DATE(NOW())
	AND memberships.role != 'pending'
	order by e.start_time asc`;

	const data = userID

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getDashboardEvents', (req,res) => {

	let connection = mysql.createConnection(config);
	// let clubID = req.body.clubID;
	let userID = req.body.userID;

	let sql = `SELECT clubs.name, e.club_id, e.title, e.id, e.location, e.location_type, e.additionalDetails, e.start_time, e.end_time, e.body, e.price, e.allDay, e.placeholder_photo, e.start_time_text, e.end_time_text, memberships.role, clubs.id club_id  from events e
	INNER JOIN memberships on memberships.club_id = e.club_id
	INNER JOIN clubs on clubs.id = memberships.club_id
	WHERE memberships.uid = ?
	AND DATE(e.time_posted) >= DATE(DATE_SUB(NOW(), INTERVAL 12 WEEK))
	order by e.start_time asc`;

	const data = userID

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
});

app.post('/api/leaveClub', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubId;
	let userID = req.body.userId;
	let sql = `DELETE FROM memberships WHERE uid = ? AND club_id = ?`;
	const data = [userID, clubID];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
});

app.post('/api/getPastEvents', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let todaysDate = req.body.todaysDate;

	let sql = `select * from events where club_id = ? and start_time < ?`
	const data = [clubID, todaysDate];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});

})

app.post('/api/getUpcomingEvents', (req,res) => {
	let connection = mysql.createConnection(config);
	let clubID = req.body.clubID;
	let todaysDate = req.body.todaysDate;

	let sql = `select * from events where club_id = ? and start_time >= ? order by start_time asc`
	const data = [clubID, todaysDate];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/addEvent', (req,res) => {
	let connection = mysql.createConnection(config);
	let club_id = req.body.clubID;
	let title = req.body.title;
	let body = req.body.description;
	let start_time = req.body.startDateTime;
	let end_time = req.body.endDateTime;
	let allDay = req.body.allDay;
	let location_type = req.body.locationType;
	let location = req.body.location;
	let price = req.body.price;
	let additionalDetails = req.body.details;
	let placeholderImage = req.body.placeholderImg;
	let start_time_text = req.body.startDateTimeText;
	let end_time_text = req.body.endDateTimeText;
	let time_posted = req.body.timestamp;

	let sql = `insert into events (club_id, title, location, start_time, end_time, body, time_posted, price, allDay, placeholder_photo, additional_details, location_type, start_time_text, end_time_text)
	values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
	data = [club_id, title, location, start_time, end_time, body, time_posted, price, allDay, placeholderImage, additionalDetails ,location_type, start_time_text, end_time_text]
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/deleteEvent', (req,res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;

	let sql = `delete from events where id = ?`

	data = [eventID]
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/getAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;

	let sql = `select * from attendance where event_id = ?`
	const data = eventID;

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/setAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;
	let userID = req.body.userID;
	let status = req.body.attendanceStatus;
	let name = req.body.name;

	console.log(eventID, userID, status, name);
	let sql = `INSERT into attendance (event_id, uid, status, name) values (?,?,?,?)`
	const data = [eventID, userID, status, name];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/changeAttendance', (req, res) => {
	let connection = mysql.createConnection(config);
	let eventID = req.body.eventID;
	let userID = req.body.userID;
	let status = req.body.attendanceStatus;

	let sql = `UPDATE attendance SET status = ? WHERE uid=? and event_id = ?`
	const data = [status, userID, eventID];

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
})

app.post('/api/addAdmin', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

    let sql = `UPDATE memberships as m, users as u
	SET role = 'admin'
	WHERE m.uid = u.uid and u.uid=?`

	const data = [userID]
	
    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

})

app.post('/api/removeAdmin', (req, res) => {
    let connection = mysql.createConnection(config);
    let userID = req.body.userID;

    let sql = `UPDATE memberships as m, users as u
	SET role = 'user'
	WHERE m.uid = u.uid and u.uid=?`

	const data = [userID]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

});

app.post('/api/transferClubOwnership', (req, res) => {
    let connection = mysql.createConnection(config);
    let newOwnerID = req.body.newOwnerID;
	let oldOwnerID = req.body.oldOwnerID;
	let clubID = req.body.clubID;
	let newRole = req.body.role;

    let sql = `UPDATE memberships as m1
	JOIN 
	(
		SELECT ? as uid, ? as club_id, 'owner' as role
		UNION
		select ? as CustomerID, ? as club_id, ? as role
	) as m2 on m1.uid=m2.uid and m1.club_id=m2.club_id
	set m1.role=m2.role;`

	const data = [newOwnerID, clubID, oldOwnerID, clubID, newRole]

    connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();

});

app.post('/api/logGuestVisit', (req,res) => {
	let connection = mysql.createConnection(config);
	let timestamp = req.body.timestamp;

	let sql = `insert into guest_logs (demo_datetime)
	values(?)`

	data = [timestamp]
	
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify(results);
		res.send({ express: string })
	});
	connection.end();
});

const port = process.env.REACT_APP_SERVER_PORT || 3001;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => res.send("Express on Vercel"));

module.exports = app;
