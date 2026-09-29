import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_URL = "http://localhost:5000/api/requests";

  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    category: "Academic",
    description: "",
    priority: "Medium",
  });

  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);


  // GET - Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };


  // Fetch requests when page loads
  useEffect(() => {
    fetchRequests();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // POST / PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        // PUT - Update request
        const response = await fetch(
          `${API_URL}/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const updatedRequest = await response.json();

        setRequests(
          requests.map((request) =>
            request.id === editingId
              ? updatedRequest
              : request
          )
        );

        setEditingId(null);

      } else {

        // POST - Create request
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const newRequest = await response.json();

        setRequests([...requests, newRequest]);
      }


      // Reset form
      setFormData({
        studentName: "",
        email: "",
        category: "Academic",
        description: "",
        priority: "Medium",
      });

    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };


  // Edit request
  const handleEdit = (request) => {

    setFormData({
      studentName: request.studentName,
      email: request.email,
      category: request.category,
      description: request.description,
      priority: request.priority,
    });

    setEditingId(request.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  // DELETE
  const handleDelete = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setRequests(
        requests.filter(
          (request) => request.id !== id
        )
      );

    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };


  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div>
          <h1>
            Campus<span>Connect</span>
          </h1>

          <p>
            Student Request & Issue Desk
          </p>
        </div>

        <div className="status">
          ● Campus Support
        </div>

      </header>


      <main className="container">


        {/* FORM */}

        <section className="form-section">

          <div className="section-heading">

            <span>01</span>

            <div>

              <h2>
                {editingId
                  ? "Update Request"
                  : "Raise a Request"}
              </h2>

              <p>
                {editingId
                  ? "Modify your existing campus request."
                  : "Tell us what you need help with."}
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>


            {/* NAME + EMAIL */}

            <div className="input-row">

              <div className="input-group">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  placeholder="Enter your name"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="input-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* CATEGORY + PRIORITY */}

            <div className="input-row">

              <div className="input-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option>
                    Academic
                  </option>

                  <option>
                    Infrastructure
                  </option>

                  <option>
                    Technical
                  </option>

                  <option>
                    Hostel
                  </option>

                  <option>
                    Library
                  </option>

                  <option>
                    Other
                  </option>

                </select>

              </div>


              <div className="input-group">

                <label>
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >

                  <option>
                    Low
                  </option>

                  <option>
                    Medium
                  </option>

                  <option>
                    High
                  </option>

                </select>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="input-group">

              <label>
                Problem Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your problem or request..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>

            </div>


            <button type="submit">

              {editingId
                ? "Update Request →"
                : "Submit Request →"}

            </button>

          </form>

        </section>



        {/* REQUESTS */}

        <section className="requests-section">

          <div className="section-heading">

            <span>02</span>

            <div>

              <h2>
                Campus Requests
              </h2>

              <p>

                {requests.length === 0
                  ? "Track submitted problems and requests."
                  : `${requests.length} request${
                      requests.length > 1
                        ? "s"
                        : ""
                    } submitted`}

              </p>

            </div>

          </div>


          {requests.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ◎
              </div>

              <h3>
                No requests yet
              </h3>

              <p>
                Your submitted requests will appear here.
              </p>

            </div>

          ) : (

            <div className="request-list">

              {requests.map((request) => (

                <div
                  className="request-card"
                  key={request.id}
                >

                  <div className="request-top">

                    <div>

                      <h3>
                        {request.category}
                      </h3>

                      <p>
                        {request.studentName}
                        {" · "}
                        {request.email}
                      </p>

                    </div>


                    <span
                      className={`priority ${request.priority.toLowerCase()}`}
                    >
                      {request.priority}
                    </span>

                  </div>


                  <p className="description">
                    {request.description}
                  </p>


                  <div className="request-actions">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(request)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(request.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;