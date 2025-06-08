class Trash {
  final String id;
  final String name;
  final String location;
  final String status;

  Trash({
    required this.id,
    required this.name,
    required this.location,
    required this.status,
  });

  factory Trash.fromJson(Map<String, dynamic> json) {
    return Trash(
      id: json['id'],
      name: json['name'],
      location: json['location'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'location': location,
      'status': status,
    };
  }
}
