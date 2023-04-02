import dummyImg from './img/download.png';

export default function BirthdayCard({ friends }) {
  // Calculate the number of days remaining for each friend's birthday
  const friendsWithDaysRemaining = friends.map((friend) => {
    const birthdate = new Date(friend.birthday);
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const diffDays = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    return { ...friend, daysRemaining: diffDays };
  });

  // Sort the list of friends based on the number of days remaining
  const sortedFriends = friendsWithDaysRemaining.sort((a, b) => a.daysRemaining - b.daysRemaining);

  // Format birthdate as "2nd February"
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10) * day % 10];
    return <>{day}<sup>{suffix}</sup> {month}</>;

  };

  return (
    <>
      {sortedFriends.map((friend) => (
        <div className="card mb-2" key={friend._id}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 m-auto">
                <div className="align-self-center">
                  <img src={friend.photo || dummyImg} className="friendImg" alt="" />
                </div>
              </div>
              <div className="col-md-5 m-auto">
                <div className="align-self-center text-center">
                  <h4 className="fw-bolder friendname">{friend.name}</h4>
                  <p
                    className="mb-0 text-secondary"
                    style={{
                      maxHeight: '40px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    <i className='fa fa-clock '></i> {friend.daysRemaining} Days remaining
                  </p>
                </div>
              </div>
              <div className="col-md-4 m-auto">
                <div className="">
                  <h5 className="mb-0 my-auto birthdate"><i className='fa fa-cake text-danger'></i> {formatDate(new Date(friend.birthday))}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="floating-button">
        <button className="floating-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <i className="fa-solid fa-calendar-plus"></i>
        </button>
      </div>
    </>
  );
}
