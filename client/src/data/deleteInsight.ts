export const deleteInsight = async (id: number) => {
  try {
    const response = await fetch(`/api/insight/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete the item");
    }

    location.reload();
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Could not delete the item.");
  }
};
