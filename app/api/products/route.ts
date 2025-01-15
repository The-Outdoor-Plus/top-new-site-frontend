import { NextResponse } from 'next/server';
import { mockProducts } from '@/data/mock-products';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '30');
    const sort = searchParams.get('sort') || 'featured';
    const category = searchParams.get('category');

    // Filter products based on query parameters
    let filteredProducts = [...mockProducts];

    // Apply category filter
    if (category) {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(category)
      );
    }

    // Apply special filters
    const special = searchParams.getAll('special[]');
    if (special.includes('onSale')) {
      filteredProducts = filteredProducts.filter(product => product.onSale);
    }
    if (special.includes('quickShip')) {
      filteredProducts = filteredProducts.filter(product => product.isQuickShip);
    }
    if (special.includes('propaneFriendly')) {
      filteredProducts = filteredProducts.filter(product => product.hasPropaneTankDoor);
    }

    // Apply attribute filters
    const materials = searchParams.getAll('materials[]');
    if (materials.length) {
      filteredProducts = filteredProducts.filter(product =>
        materials.includes(product.attributes.material[0] || '')
      );
    }

    const sizes = searchParams.getAll('sizes[]');
    if (sizes.length) {
      filteredProducts = filteredProducts.filter(product =>
        sizes.includes(product.attributes.size[0] || '')
      );
    }

    const gasTypes = searchParams.getAll('gasTypes[]');
    if (gasTypes.length) {
      filteredProducts = filteredProducts.filter(product =>
        gasTypes.includes(product.attributes.gasType[0] || '')
      );
    }

    const ignitionTypes = searchParams.getAll('ignitionTypes[]');
    if (ignitionTypes.length) {
      filteredProducts = filteredProducts.filter(product =>
        ignitionTypes.includes(product.attributes.ignitionType[0] || '')
      );
    }

    // Apply sorting
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.msrp - b.msrp);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.msrp - a.msrp);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        filteredProducts.reverse();
        break;
      // 'featured' is default, no sorting needed
    }

    // Calculate pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedProducts = filteredProducts.slice(start, end);

    return NextResponse.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 