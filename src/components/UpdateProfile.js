import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import swal from "sweetalert2";

function UpdateProfile({ onUpdate, initialDetails }) {
  const [name, setName] = useState(initialDetails.name || "");
  const [email, setEmail] = useState(initialDetails.email || "");

  const [mobileNumber, setMobileNumber] = useState(
    initialDetails.mobileNumber || ""
  );
  const initialAddress =
    initialDetails.address && initialDetails.address.length > 0
      ? initialDetails.address[0]
      : {};

  const [streetNumber, setStreetNumber] = useState(
    initialAddress.streetNumber || ""
  );
  const [barangay, setBarangay] = useState(initialAddress.barangay || "");
  const [municipality, setMunicipality] = useState(
    initialAddress.municipality || ""
  );
  const [province, setProvince] = useState(initialAddress.province || "");

  useEffect(() => {
    setName(initialDetails.name || "");
    setEmail(initialDetails.email || "");
    setMobileNumber(initialDetails.mobileNumber || "");
    setStreetNumber(initialAddress.streetNumber || "");
    setBarangay(initialAddress.barangay || "");
    setMunicipality(initialAddress.municipality || "");
    setProvince(initialAddress.province || "");
  }, [initialDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const updatedProfile = {
      name,
      email,
      mobileNumber,
      address: [
        {
          streetNumber,
          barangay,
          municipality,
          province,
        },
      ],
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/e-commerce/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      }
    );

    if (response.ok) {
      onUpdate();
      swal.fire({
        title: "Success",
        icon: "success",
        text: "Successfully updated profile",
      });
    } else {
      swal.fire({
        title: "Error!",
        icon: "error",
        text: "Error updating profile",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="mobileNumber">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="streetNumber">
        <Form.Label>Street Number</Form.Label>
        <Form.Control
          type="text"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="barangay">
        <Form.Label>Barangay</Form.Label>
        <Form.Control
          type="text"
          value={barangay}
          onChange={(e) => setBarangay(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="municipality">
        <Form.Label>Municipality</Form.Label>
        <Form.Control
          type="text"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="province">
        <Form.Label>Province</Form.Label>
        <Form.Control
          type="text"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="mt-3">
        Update Profile
      </Button>
    </Form>
  );
}

export default UpdateProfile;
