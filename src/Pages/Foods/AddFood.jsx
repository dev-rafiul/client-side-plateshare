import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import { motion } from "framer-motion";
import { Plus, Upload, Calendar, MapPin, FileText, User } from "lucide-react";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodData = {
      food_name: form.foodName.value,
      food_image: form.foodImage.value,
      food_quantity: form.foodQuantity.value,
      pickup_location: form.pickupLocation.value,
      expire_date: form.expireDate.value,
      additional_notes: form.additionalNotes.value,
      food_status: "Available",
      donator_name: user?.displayName,
      donator_email: user?.email,
      donator_photo: user?.photoURL,
    };

    try {
      const res = await axios.post(
        "https://plateshare-server-mu.vercel.app/add-food",
        foodData
      );

      if (res.data.insertedId) {
        toast.success("Food added successfully!");
        form.reset();
        window.dispatchEvent(new Event("foodAdded"));
      }
    } catch (error) {
      toast.error("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold">Add New Food</h1>
        <p className=" mt-2">
          Share your surplus food with people in need
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className=" rounded-2xl shadow-sm border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-12">

          {/* Food Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5" /> Food Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Name
                </label>
                <input
                  type="text"
                  name="foodName"
                  placeholder="Homemade Pasta"
                  required
                  className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (servings)
                </label>
                <input
                  type="number"
                  name="foodQuantity"
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Food Image URL
                </label>
                <input
                  type="url"
                  name="foodImage"
                  placeholder="https://image.com/food.jpg"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="h-px "></div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5" /> Pickup & Expiry
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  name="pickupLocation"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Expiry Date
                </label>
                <input
                  type="date"
                  name="expireDate"
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              rows="4"
              placeholder="Any dietary or pickup instructions"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            ></textarea>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Donator */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-6">
              <User className="w-5 h-5" /> Donator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                value={user?.displayName || "Anonymous"}
                readOnly
                className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg"
              />
              <input
                value={user?.email || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 px-4 py-3 rounded-lg"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
            >
              {loading ? "Adding..." : <><Plus className="w-5 h-5" /> Add Food</>}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default AddFood;
