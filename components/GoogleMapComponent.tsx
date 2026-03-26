import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface GoogleMapComponentProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    id: string;
    position: { lat: number; lng: number };
    title?: string;
    icon?: string;
    color?: string;
  }>;
  routes?: Array<{
    path: Array<{ lat: number; lng: number }>;
    color: string;
  }>;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

export default function GoogleMapComponent({
  center = { lat: 1.3521, lng: 103.8198 }, // Singapore center
  zoom = 12,
  markers = [],
  routes = [],
  className = 'w-full h-full',
}: GoogleMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // User needs to add this

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=geometry,places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      if (window.google && window.google.maps) {
        initializeMap();
      } else {
        setError('Failed to load Google Maps');
        setLoading(false);
      }
    };
    
    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your API key.');
      setLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      updateMapContent();
    }
  }, [markers, routes]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      mapInstanceRef.current = map;
      updateMapContent();
      setLoading(false);
    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Error initializing map');
      setLoading(false);
    }
  };

  const updateMapContent = () => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Clear existing polylines
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    polylinesRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current,
        title: markerData.title || markerData.id,
        icon: markerData.icon || {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: markerData.color || '#3b82f6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8,
        },
      });

      if (markerData.title) {
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px;"><strong>${markerData.title}</strong></div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });
      }

      markersRef.current.push(marker);
    });

    // Add routes
    routes.forEach(route => {
      const polyline = new window.google.maps.Polyline({
        path: route.path,
        geodesic: true,
        strokeColor: route.color,
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: mapInstanceRef.current,
      });

      polylinesRef.current.push(polyline);
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend(marker.position);
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  };

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        <div className="text-center p-6">
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <p className="text-xs text-muted-foreground">
            Please add your Google Maps API key in the environment variables
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
}
