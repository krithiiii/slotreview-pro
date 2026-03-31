import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Order "mo:core/Order";

actor {
  type SlotCategory = {
    #classic;
    #video;
    #progressive;
    #megaways;
  };

  type Volatility = {
    #low;
    #medium;
    #high;
  };

  type SlotReview = {
    id : Nat;
    title : Text;
    developer : Text;
    category : SlotCategory;
    description : Text;
    overview : Text;
    features : Text;
    gameplay : Text;
    verdict : Text;
    rating : Float;
    rtp : Float;
    volatility : Volatility;
    minBet : Float;
    maxBet : Float;
    pros : [Text];
    cons : [Text];
    screenshotUrls : [Text];
    videoUrl : ?Text;
    featuredImageUrl : Text;
    isFeatured : Bool;
    dateAdded : Int;
  };

  type SlotReviewInput = {
    title : Text;
    developer : Text;
    category : SlotCategory;
    description : Text;
    overview : Text;
    features : Text;
    gameplay : Text;
    verdict : Text;
    rating : Float;
    rtp : Float;
    volatility : Volatility;
    minBet : Float;
    maxBet : Float;
    pros : [Text];
    cons : [Text];
    screenshotUrls : [Text];
    videoUrl : ?Text;
    featuredImageUrl : Text;
    isFeatured : Bool;
  };

  module SlotReview {
    public func compareById(a : SlotReview, b : SlotReview) : Order.Order {
      Nat.compare(a.id, b.id);
    };

    public func compareByRating(a : SlotReview, b : SlotReview) : Order.Order {
      Float.compare(a.rating, b.rating);
    };

    public func compareByRtp(a : SlotReview, b : SlotReview) : Order.Order {
      Float.compare(a.rtp, b.rtp);
    };
  };

  let reviews = Map.empty<Nat, SlotReview>();
  var nextId = 1;

  // Access control
  func requireAdmin(caller : Principal) {
    if (caller.toText() != "2vxsx-fae") { Runtime.trap("Not authorized") };
  };

  func generateId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  public shared ({ caller }) func addSlotReview(input : SlotReviewInput) : async Nat {
    requireAdmin(caller);
    let id = generateId();
    let review : SlotReview = {
      input with
      id;
      dateAdded = Time.now();
    };
    reviews.add(id, review);
    id;
  };

  public shared ({ caller }) func updateSlotReview(id : Nat, input : SlotReviewInput) : async () {
    requireAdmin(caller);
    switch (reviews.get(id)) {
      case (null) { Runtime.trap("Review not found") };
      case (?existing) {
        let updated : SlotReview = {
          input with
          id = existing.id;
          dateAdded = existing.dateAdded;
        };
        reviews.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteSlotReview(id : Nat) : async () {
    requireAdmin(caller);
    if (not reviews.containsKey(id)) {
      Runtime.trap("Review not found");
    };
    reviews.remove(id);
  };

  public query ({ caller }) func getAllSlotReviews() : async [SlotReview] {
    reviews.values().toArray().sort(SlotReview.compareById);
  };

  public query ({ caller }) func getSlotReview(id : Nat) : async ?SlotReview {
    reviews.get(id);
  };

  public query ({ caller }) func getFeaturedReviews() : async [SlotReview] {
    reviews.values().toArray().filter(func(r) { r.isFeatured });
  };

  public query ({ caller }) func getReviewsByCategory(category : SlotCategory) : async [SlotReview] {
    reviews.values().toArray().filter(func(r) { r.category == category });
  };

  public query ({ caller }) func getReviewsByRatingRange(minRating : Float, maxRating : Float) : async [SlotReview] {
    reviews.values().toArray().filter(func(r) { r.rating >= minRating and r.rating <= maxRating });
  };

  public query ({ caller }) func getReviewsByRtpRange(minRtp : Float, maxRtp : Float) : async [SlotReview] {
    reviews.values().toArray().filter(func(r) { r.rtp >= minRtp and r.rtp <= maxRtp });
  };

  public query ({ caller }) func getReviewsByVolatility(volatility : Volatility) : async [SlotReview] {
    reviews.values().toArray().filter(func(r) { r.volatility == volatility });
  };

  // Seed data on init
  system func preupgrade() {};

  system func postupgrade() {
    if (reviews.size() == 0) {
      let now = Time.now();
      let seedReviews : [SlotReview] = [
        {
          id = generateId();
          title = "Book of Dead";
          developer = "Play'n GO";
          category = #video;
          description = "Ancient Egyptian adventure slot";
          overview = "Popular high variance Egyptian-themed slot with free spins and expanding symbols.";
          features = "Free spins, expanding symbols, gamble feature";
          gameplay = "5x3 grid, 10 paylines, simple and fast gameplay";
          verdict = "One of the most iconic online slots, great for risk-takers.";
          rating = 8.5;
          rtp = 96.21;
          volatility = #high;
          minBet = 0.10;
          maxBet = 100.0;
          pros = ["High win potential", "Simple gameplay", "Popular theme"];
          cons = ["Very volatile", "No bonus game"];
          screenshotUrls = ["/book-of-dead1.png", "/book-of-dead2.png"];
          videoUrl = ?"/book-of-dead-video.mp4";
          featuredImageUrl = "/book-of-dead-featured.png";
          isFeatured = true;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Mega Moolah";
          developer = "Microgaming";
          category = #progressive;
          description = "Legendary progressive jackpot slot";
          overview = "African safari-themed slot famous for massive jackpots.";
          features = "Progressive jackpots, free spins, wilds";
          gameplay = "Simple 5-reel setup with big win potential";
          verdict = "A classic jackpot slot, but base game is low on action.";
          rating = 7.8;
          rtp = 88.12;
          volatility = #medium;
          minBet = 0.25;
          maxBet = 6.25;
          pros = ["Huge jackpots", "Simple gameplay"];
          cons = ["Low base game RTP", "Can be volatile"];
          screenshotUrls = ["/mega-moolah1.png", "/mega-moolah2.png"];
          videoUrl = null;
          featuredImageUrl = "/mega-moolah-featured.png";
          isFeatured = true;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Starburst";
          developer = "NetEnt";
          category = #video;
          description = "Classic arcade-style slot";
          overview = "Low variance, colorful slot with expanding wild re-spins.";
          features = "Expanding wilds, win both ways, re-spins";
          gameplay = "Fast-paced, easy to play, suitable for beginners";
          verdict = "Great for low-risk play, not for big wins.";
          rating = 8.0;
          rtp = 96.09;
          volatility = #low;
          minBet = 0.10;
          maxBet = 100.0;
          pros = ["Low volatility", "Fun graphics", "Frequent wins"];
          cons = ["Low max payout", "No free spins"];
          screenshotUrls = ["/starburst1.png", "/starburst2.png"];
          videoUrl = null;
          featuredImageUrl = "/starburst-featured.png";
          isFeatured = false;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Bonanza Megaways";
          developer = "Big Time Gaming";
          category = #megaways;
          description = "High variance multi-way slot";
          overview = "Revolutionary slot with up to 117,649 ways to win.";
          features = "Megaways mechanic, free spins, unlimited multipliers";
          gameplay = "Cascading reels, changing pay lines, huge win potential";
          verdict = "Exciting and volatile, perfect for thrill seekers.";
          rating = 9.0;
          rtp = 96.0;
          volatility = #high;
          minBet = 0.20;
          maxBet = 20.0;
          pros = ["Massive win potential", "Innovative features"];
          cons = ["Can be streaky", "Complex for beginners"];
          screenshotUrls = ["/bonanza-megaways1.png", "/bonanza-megaways2.png"];
          videoUrl = ?"/bonanza-video.mp4";
          featuredImageUrl = "/bonanza-featured.png";
          isFeatured = true;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Gonzo's Quest";
          developer = "NetEnt";
          category = #video;
          description = "Adventure-packed avalanche slot";
          overview = "Follow Gonzo on his quest for gold with avalanche wins and multipliers.";
          features = "Avalanche wins, free falls, increasing multipliers";
          gameplay = "Unique cascading reels, climbing multipliers";
          verdict = "Engaging slot with steady action and potential big wins.";
          rating = 8.7;
          rtp = 95.97;
          volatility = #medium;
          minBet = 0.20;
          maxBet = 50.0;
          pros = ["Avalanche feature", "Great graphics"];
          cons = ["Jackpots can be elusive", "Variance can be high"];
          screenshotUrls = ["/gonzos-quest1.png", "/gonzos-quest2.png"];
          videoUrl = null;
          featuredImageUrl = "/gonzos-quest-featured.png";
          isFeatured = true;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "888 Dragons";
          developer = "Pragmatic Play";
          category = #classic;
          description = "Simple 3-reel dragon slot";
          overview = "Minimalist Asian-themed slot with just one payline.";
          features = "Classic setup, stacked symbols, respins";
          gameplay = "Straightforward, no-nonsense classic slot action";
          verdict = "Ideal for fans of retro slots and new players.";
          rating = 7.2;
          rtp = 97.84;
          volatility = #low;
          minBet = 0.05;
          maxBet = 50.0;
          pros = ["Very high RTP", "Easy to play"];
          cons = ["Limited features", "Low max payout"];
          screenshotUrls = ["/888-dragons1.png", "/888-dragons2.png"];
          videoUrl = null;
          featuredImageUrl = "/888-dragons-featured.png";
          isFeatured = false;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Divine Fortune";
          developer = "NetEnt";
          category = #progressive;
          description = "Greek mythology jackpot slot";
          overview = "Features expanding wilds, respins, and jackpot";
          features = "Expanding wilds, respins, free spins";
          gameplay = "Balanced gameplay with big win potential";
          verdict = "Good mix of steady wins and jackpot chase";
          rating = 8.3;
          rtp = 96.59;
          volatility = #medium;
          minBet = 0.20;
          maxBet = 100.0;
          pros = ["Multiple jackpots", "Fun theme"];
          cons = ["Jackpot wins are rare", "Expensive max bet"];
          screenshotUrls = ["/divine-fortune1.png", "/divine-fortune2.png"];
          videoUrl = null;
          featuredImageUrl = "/divine-fortune-featured.png";
          isFeatured = true;
          dateAdded = now;
        },
        {
          id = generateId();
          title = "Fruit Shop";
          developer = "NetEnt";
          category = #classic;
          description = "Classic fruit machine reboot";
          overview = "Modern twist on classic fruit slots with free spins";
          features = "Free spins, wilds, multipliers";
          gameplay = "Simple rinse and repeat with an exciting bonus";
          verdict = "Great choice for low-risk play and casual fun";
          rating = 7.9;
          rtp = 96.71;
          volatility = #low;
          minBet = 0.15;
          maxBet = 150.0;
          pros = ["Frequent free spins", "Low volatility"];
          cons = ["Limited bonus features", "Modest jackpots"];
          screenshotUrls = ["/fruit-shop1.png", "/fruit-shop2.png"];
          videoUrl = null;
          featuredImageUrl = "/fruit-shop-featured.png";
          isFeatured = false;
          dateAdded = now;
        },
      ];

      for (review in seedReviews.values()) {
        reviews.add(review.id, review);
      };
    };
  };
};
