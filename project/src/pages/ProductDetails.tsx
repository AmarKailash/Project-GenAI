import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Truck, Package, Star } from 'lucide-react';
import { ProductGallery } from '../components/products/ProductDetails/ProductGallery';
import { ProductActions } from '../components/products/ProductActions';
import { ProductPrice } from '../components/products/ProductPrice';
import { ProductGrid } from '../components/products/ProductGrid';
import { useProductRecommendations } from '../hooks/useProducts';
import { mockProducts } from '../lib/db/mockData';
import type { Product } from '../types';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('description');
  
  const product = mockProducts.find(p => p.id === id);
  const { recommendations, isLoading } = useProductRecommendations(product || null, mockProducts);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  const handleCompare = () => {
    navigate(`/compare?product1=${product.id}`);
  };

  const images = [
    product.image_url,
    'https://images.unsplash.com/photo-1600541519467-937869997e34',
    'https://images.unsplash.com/photo-1592286927505-1def25115558',
    'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-8 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <ProductGallery images={images} productName={product.name} />

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(150 Reviews)</span>
              </div>

              <div className="mb-6">
                <ProductPrice 
                  price={product.price} 
                  originalPrice={product.original_price} 
                />
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span>{product.condition} Condition - 6 Months Warranty</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-green-500 mr-3" />
                  <span>Free Delivery by Tomorrow</span>
                </div>
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-green-500 mr-3" />
                  <span>7 Days Replacement Policy</span>
                </div>
              </div>

              {/* Product Actions */}
              <ProductActions product={product} onCompare={handleCompare} />
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="border-b mb-6">
            <div className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-4 px-2 capitalize ${
                    selectedTab === tab
                      ? 'border-b-2 border-green-500 text-green-500'
                      : 'text-gray-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {selectedTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
              <ul className="mt-4 space-y-2">
                <li>Brand: {product.name.split(' ')[0]}</li>
                <li>Model: {product.name}</li>
                <li>Condition: {product.condition}</li>
                <li>Category: {product.category}</li>
              </ul>
            </div>
          )}

          {selectedTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpecificationGroup 
                title="Technical Details"
                specs={getTechnicalSpecs(product)}
              />
              <SpecificationGroup 
                title="Physical Details"
                specs={getPhysicalSpecs(product)}
              />
            </div>
          )}

          {selectedTab === 'reviews' && (
            <div className="space-y-6">
              {mockReviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>

        {/* Similar Products */}
        {!isLoading && recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <ProductGrid products={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}

function SpecificationGroup({ title, specs }: { title: string; specs: Record<string, string> }) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b">
            <span className="text-gray-600">{key}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="border-b pb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-4">
            <h4 className="font-semibold">{review.userName}</h4>
            <div className="flex items-center text-yellow-400">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
        <span className="text-gray-500">{review.date}</span>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
}

function getTechnicalSpecs(product: Product) {
  // Example specs based on category
  if (product.category === 'Phones') {
    return {
      'Processor': 'A15 Bionic',
      'RAM': '6GB',
      'Storage': '256GB',
      'Display': '6.1" OLED',
      'Battery': '3240 mAh',
      'OS': 'iOS 15'
    };
  }
  
  if (product.category === 'Laptops') {
    return {
      'Processor': 'M1 Pro',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Display': '14" Retina',
      'Graphics': 'Integrated',
      'OS': 'macOS'
    };
  }

  return {
    'Category': product.category,
    'Condition': product.condition
  };
}

function getPhysicalSpecs(product: Product) {
  if (product.category === 'Phones') {
    return {
      'Dimensions': '146.7 x 71.5 x 7.7 mm',
      'Weight': '204g',
      'Build': 'Glass front/back, aluminum frame',
      'Colors': 'Graphite',
      'Water Resistance': 'IP68'
    };
  }

  if (product.category === 'Laptops') {
    return {
      'Dimensions': '31.26 x 22.12 x 1.55 cm',
      'Weight': '1.6 kg',
      'Build': 'Aluminum unibody',
      'Colors': 'Space Gray',
      'Ports': 'Thunderbolt 4, HDMI, MagSafe'
    };
  }

  return {
    'Condition Details': 'Fully functional, minor cosmetic wear',
    'Package Contents': 'Device, charger, manual'
  };
}

const mockReviews = [
  {
    userName: 'John Doe',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent product! The condition was exactly as described and delivery was super fast.'
  },
  {
    userName: 'Jane Smith',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    rating: 4,
    date: '1 week ago',
    comment: 'Great value for money. Very satisfied with the purchase.'
  },
  {
    userName: 'Mike Johnson',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The product exceeded my expectations. Would definitely buy again!'
  }
];

export default ProductDetails;