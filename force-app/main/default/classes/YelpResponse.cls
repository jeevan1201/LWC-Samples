public class YelpResponse {
	public List<Businesses> businesses;

	public class Businesses {
		public String id;
		public String name;
		public String image_url;
		public String url;
		public Integer review_count;
		public Double rating;
        public String display_phone;
		public Location location;
	}

	public class Location {
		public String address1;
		public String address2;
		public String address3;
		public String city;
		public String zip_code;
		public String country;
		public String state;
	}
}