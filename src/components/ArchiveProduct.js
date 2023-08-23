import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ArchiveProduct({ productId, isActive, fetchData }) {
  const handleArchive = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/e-commerce/products/${productId}/archive`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Archived!",
            icon: "success",
            text: "Product archived successfully",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "An error occurred while activating the Product.",
          });
        }
      });
  };

  const handleActivate = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/e-commerce/products/${productId}/activate`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          Swal.fire({
            title: "Activated!",
            icon: "success",
            text: "Product activated successfully",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "An error occurred while activating the Product.",
          });
        }
      });
  };

  return (
    <>
      {isActive ? (
        <Button className="btn btn-danger" onClick={handleArchive}>
          Archive
        </Button>
      ) : (
        <Button className="btn btn-success" onClick={handleActivate}>
          Activate
        </Button>
      )}
    </>
  );
}
