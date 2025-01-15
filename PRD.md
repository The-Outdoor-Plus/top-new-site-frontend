# Product Requirements

Product requirements for new-top-website


# Overview of the project

This project is the frontend of an almost full E-Commerce website for the Manufacturer of Fire and Water Feature The Outdoor Plus. There will be no checkout process here, so people CAN'T buy. Its just information but there will be products, products filter, product pages, search, MSRP for products and everything else.

Backend will be in PayloadCMS so take into in account that so in order to make the frontend it should mimic the structure of how the information comes from the PayloadCMS API. Also will be using Typesense for the search.

## Modules (Or pages)
### Product Page

- Product Photo Gallery (Photos and Videos)
- Product Title
- MSRP Price (Show Discounted price if any)
- Show Part Number (Based on selected configuration)
- Show short description
- Show product combination options (This has to be optimized as possible, no matter how many variation and possible combinations can be. Produc has to load in reasonable time and be able to load SKU and variations quickly)
- Product Add-Ons (Like Canvas Cover, Burning Media, Bullet Burner Upgrade, etc)
- Add to RFQ Form instead of Add TO Cart
- Where to Buy Dealer Button
- Quantity (To ad to RFQ)
- Quick Dimensions and Specifications
- Full Product Description
- Full Specifications Table
- Guide, Documents & Manuals
- Section for a featured Video
- Section for a vertical tab with key feature (Similar to Solo Stove)
- FAQs
- Upsells & Cross Sells
- Certification Badges
- Made in the U.S.A Badge
- Color Guide (Dynamic based on the Available Materials for the product)

### Product Results
- List at least 30+ (As long as it's optimal and fast). Will be showed as a grid. We want to show as much results as possible.
- Pagination will be a manual scroll pagination (with a Load More Button at the end)
- Secondary Photo (or video) on hover
- Show if the product has customizable options
- Show if the product it's a best seller
- Show MSRP
- Show Material (Show only if material is NOT an attribute. Meaning there's more than 1 material for the product)
- Product Filters (Products on Sale (Current Promotion), Products with a Propane Tank Door (Propane Friendly Fire Pit), Tags, Attributes, Categories
- Product Sorting

### Gallery -> Images Page
- Show as a grid or masonry.
- High quality images (But performant)
- Optimized images for faster load
- Show metadata on images
- Similar to Zenfolotio
- Add a search for the gallery based on metadata

### Gallery - Videos Pages
- Automatically load images from Youtube Channel (Sorted by last uploaded first)

### Resources -> Manuals & Documents Page
- List all Manual and Documents by Sections

### Resources -> Register Products Form Page
- First Name,
- Last Name
- Email Address
- Phone Number
- Address 1
- Address 2
- City
- State
- Zip
- Country
- PO Number 
- Serial number
- Place Of Purchase
- Date of Purchase 
- Additional Information
- Proof Of Purchase (File Attachment)
- Connect form submission with Google sheets.

### Resources -> Color Swatch Guide Page
- List of colors, sectioned by Materials
- The material sections will be tabs

### Resources -> Custom Product Order Form 

### Resources -> Dealer Program Page
- Send form information along with application form 

### Resources -> Check Order Status Page
- Send Notification to sales and support
- Put information into google sheets

### Catalogs Page
- Current Catalogs
- Archive Catalogs 

### Privacy Policy Page

### Terms and Conditions Page

### About Us Page