import { useState, useEffect } from "react";
import { getLeads, createLead, updateLead, deleteLead } from "./api/leadApi";

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
    // Search and Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const handleEdit = (lead) => {
  setEditId(lead._id);

  setFormData({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    source: lead.source,
    status: lead.status
  });
};
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this lead?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await deleteLead(id);

    alert("Lead deleted successfully!");

    await fetchLeads();

  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete lead");
  }
};
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "New"
  });

const fetchLeads = async () => {
  try {
    const response = await getLeads({
      search: search,
      status: statusFilter
    });

    setLeads(response.data.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit new lead
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editId) {
      await updateLead(editId, formData);
      alert("Lead updated successfully!");
    } else {
      await createLead(formData);
      alert("Lead added successfully!");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "",
      status: "New"
    });

    setEditId(null);
    fetchLeads();

  } catch (error) {
  console.error("UPDATE ERROR:", error);

  console.log("Response:", error.response);
  console.log("Error data:", error.response?.data);

  alert(
    error.response?.data?.message || error.message
  );
}
};

 
return (
  <div className="container-fluid bg-light min-vh-100 py-4">
    <div className="container">

      {/* Dashboard Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Lead Manager</h1>
          <p className="text-muted">Manage your business leads</p>
        </div>

        <span className="badge bg-primary fs-6 p-2">
          Total Leads: {leads.length}
        </span>
      </div>

      {/* Add / Edit Lead Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">
            {editId ? "Edit Lead" : "Add New Lead"}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-12 col-md-6 col-lg-4">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <input
                  className="form-control"
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <input
                  className="form-control"
                  type="text"
                  name="company"
                  placeholder="Enter Company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Website">Website</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Referral">Referral</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="col-12">
                <button className="btn btn-primary me-2" type="submit">
                  {editId ? "Update Lead" : "Add Lead"}
                </button>

                {editId && (
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        source: "",
                        status: "New"
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3">Search and Filter Leads</h5>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className="col-12 col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={fetchLeads}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">All Leads</h5>
        </div>

        <div className="card-body">
          {loading ? (
            <p className="text-center">Loading leads...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id}>
                      <td>{lead.name}</td>
                      <td>{lead.email}</td>
                      <td>{lead.phone}</td>
                      <td>{lead.company}</td>
                      <td>{lead.source}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEdit(lead)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(lead._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {leads.length === 0 && (
                <p className="text-center text-muted">
                  No leads found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  </div>
);

}

export default App;
