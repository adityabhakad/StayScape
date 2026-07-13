const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
    let filter = {};

    if (req.query.category) {
        filter.category = req.query.category;
    }

    if (req.query.search) {
        filter.$or = [
            { title: { $regex: req.query.search, $options: "i" } },
            { location: { $regex: req.query.search, $options: "i" } },
            { country: { $regex: req.query.search, $options: "i" } },
        ];
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", {
        allListings,
        search: req.query.search || "",
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    if (!req.file) {
        req.flash("error", "Please upload an image.");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    const address = `${req.body.listing.location}, ${req.body.listing.country}`;

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json",
                limit: 1,
            },
            headers: {
                "User-Agent": "WanderLust",
            },
        }
    );

    // Check if location was found
    if (response.data.length === 0) {
        req.flash("error", "Invalid location. Please enter a valid city and country.");
        return res.redirect("/listings/new");
    }

    const data = response.data[0];

    newListing.geometry = {
        type: "Point",
        coordinates: [
            parseFloat(data.lon),
            parseFloat(data.lat),
        ],
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        {...req.body.listing},
        { returnDocument: "after" }
    );

    if(typeof req.file !=="undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    // Update map coordinates
    const address = `${req.body.listing.location}, ${req.body.listing.country}`;

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: address,
                format: "json",
                limit: 1,
            },
            headers: {
                "User-Agent": "WanderLust",
            },
        }
    );
    // If location is found, update geometry
    if (response.data.length === 0) {
        req.flash("error", "Invalid location. Please enter a valid city and country.");
        return res.redirect(`/listings/${id}/edit`);
    }

    const data = response.data[0];

    listing.geometry = {
        type: "Point",
        coordinates: [
            parseFloat(data.lon),
            parseFloat(data.lat),
        ],
    };

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};