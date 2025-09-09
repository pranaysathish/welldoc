import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  MapPin, 
  Star, 
  Calendar, 
  Phone, 
  Clock, 
  Heart, 
  Brain, 
  Eye, 
  Stethoscope,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    { id: 'all', name: 'All', icon: Stethoscope, color: '#FEF7E8' },
    { id: 'cardiology', name: 'Cardiology', icon: Heart, color: '#F9E8E8' },
    { id: 'neurology', name: 'Neurology', icon: Brain, color: '#E8F4F8' },
    { id: 'ophthalmology', name: 'Eye Care', icon: Eye, color: '#E8F5E8' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      specialtyId: 'cardiology',
      rating: 4.9,
      reviews: 234,
      hospital: 'City General Hospital',
      distance: '2.3 km',
      nextSlot: '10:00 AM',
      image: '/doctor-1.jpg',
      experience: '15 years'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      specialtyId: 'neurology',
      rating: 4.8,
      reviews: 187,
      hospital: 'Metro Medical Center',
      distance: '3.1 km',
      nextSlot: '2:30 PM',
      image: '/doctor-2.jpg',
      experience: '12 years'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Ophthalmologist',
      specialtyId: 'ophthalmology',
      rating: 4.7,
      reviews: 156,
      hospital: 'Vision Care Clinic',
      distance: '1.8 km',
      nextSlot: '11:15 AM',
      image: '/doctor-3.jpg',
      experience: '10 years'
    },
    {
      id: 4,
      name: 'Dr. Robert Kim',
      specialty: 'Cardiologist',
      specialtyId: 'cardiology',
      rating: 4.9,
      reviews: 298,
      hospital: 'Heart & Vascular Institute',
      distance: '4.2 km',
      nextSlot: '9:45 AM',
      image: '/doctor-4.jpg',
      experience: '18 years'
    }
  ];

  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      distance: '2.3 km',
      rating: 4.6,
      departments: ['Emergency', 'Cardiology', 'Neurology', 'Pediatrics'],
      waitTime: '15 min',
      address: '123 Medical Ave, Downtown'
    },
    {
      id: 2,
      name: 'Metro Medical Center',
      distance: '3.1 km',
      rating: 4.4,
      departments: ['ICU', 'Surgery', 'Oncology', 'Neurology'],
      waitTime: '25 min',
      address: '456 Health St, Midtown'
    },
    {
      id: 3,
      name: 'St. Mary\'s Hospital',
      distance: '5.7 km',
      rating: 4.8,
      departments: ['Maternity', 'Emergency', 'Orthopedics'],
      waitTime: '10 min',
      address: '789 Care Blvd, Westside'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialtyId === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6 pb-32">
      {/* Search and Filter */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 px-1">Find Healthcare</h2>
        
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors, hospitals, or specialties..."
              className="pl-10 bg-white/80 border-gray-200 rounded-2xl h-12"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {specialties.map((specialty) => {
              const IconComponent = specialty.icon;
              const isSelected = selectedSpecialty === specialty.id;
              
              return (
                <motion.button
                  key={specialty.id}
                  onClick={() => setSelectedSpecialty(specialty.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                    isSelected 
                      ? 'shadow-lg' 
                      : 'bg-white/80 text-gray-600 hover:bg-gray-50'
                  }`}
                  style={isSelected ? { backgroundColor: specialty.color } : {}}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 rounded-lg bg-white/30 flex items-center justify-center">
                    <IconComponent className="w-3 h-3 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{specialty.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 px-1">Nearby Hospitals</h3>
        <div className="space-y-3">
          {hospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card key={hospital.id} className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#FFE4E1' }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{hospital.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{hospital.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" style={{ color: '#E8F5E8' }} />
                          <span>{hospital.waitTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="text-white rounded-xl"
                      style={{ backgroundColor: '#A8C8E1' }}
                    >
                      Directions
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hospital.departments.slice(0, 3).map((dept) => (
                      <Badge key={dept} className="bg-white/60 text-gray-600 text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {hospital.departments.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-500 text-xs">
                        +{hospital.departments.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500">{hospital.address}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Doctors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 px-1">Available Doctors</h3>
        <div className="space-y-3">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-0 shadow-lg shadow-gray-200/50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-gray-100">
                      <AvatarImage src={doctor.image} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white text-lg">
                        {doctor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="mb-2">
                        <h4 className="font-bold text-gray-800">{doctor.name}</h4>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-xs text-gray-500">{doctor.hospital}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{doctor.rating}</span>
                          <span className="text-gray-400">({doctor.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span>Next: {doctor.nextSlot}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge style={{ backgroundColor: '#E8F4F8', color: '#666' }}>
                          {doctor.experience} experience
                        </Badge>
                        <Button 
                          size="sm" 
                          className="text-white rounded-xl flex-1"
                          style={{ backgroundColor: '#E8F5E8' }}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Book Appointment
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-200 hover:bg-gray-50 rounded-xl"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg shadow-gray-200/30" style={{ backgroundColor: '#F0C4C4' }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contacts</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-12">
                <Phone className="w-4 h-4 mr-2" />
                Emergency: 911
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl h-12">
                <Phone className="w-4 h-4 mr-2" />
                Poison Control
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}