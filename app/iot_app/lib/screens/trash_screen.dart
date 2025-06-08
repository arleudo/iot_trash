import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:iot_app/models/Trash.dart';
import 'dart:async';

import 'package:iot_app/screens/login_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

class TrashScreen extends StatefulWidget {
  const TrashScreen({super.key});

  @override
  _TrashScreenState createState() => _TrashScreenState();
}

class _TrashScreenState extends State<TrashScreen> {
  List<dynamic> trashData = [];
  bool isLoading = true;
  bool loadingPrefs = true;
  String? serverIp;
  String? serverPort;
  Timer? _refreshTimer;

  @override
  void initState() {
    super.initState();
    _loadServerConfig();
  }

  Future<void> _loadServerConfig() async {
    final prefs = await SharedPreferences.getInstance();
    serverIp = prefs.getString('server_ip');
    serverPort = prefs.getString('server_port');

    if (serverIp == null || serverPort == null) {
      setState(() {
        loadingPrefs = false;
        isLoading = false;
      });
      return;
    }

    setState(() {
      loadingPrefs = false;
    });

    // Após carregar config, busca dados e inicia timer
    await _fetchTrashData();
    _refreshTimer = Timer.periodic(const Duration(seconds: 5), (timer) {
      _fetchTrashData();
    });
  }

  @override
  void dispose() {
    _refreshTimer?.cancel();
    super.dispose();
  }

  Future<void> _fetchTrashData() async {
    if (serverIp == null || serverPort == null) return;

    try {
      final response = await http.get(
        Uri.parse('http://$serverIp:$serverPort/trash'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> jsonData = json.decode(response.body);

        setState(() {
          trashData = jsonData.map((item) => Trash.fromJson(item)).toList();
          isLoading = false;
        });
      } else {
        throw Exception('Erro ao carregar dados');
      }
    } catch (e) {
      setState(() {
        isLoading = false;
      });
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'empty':
        return Colors.green;
      case 'full':
        return Colors.red;
      case 'middle':
        return Colors.orange;
      default:
        return Colors.grey; // fallback
    }
  }

  String _formatStatusLabel(String status) {
    switch (status) {
      case 'full':
        return 'Cheia';
      case 'empty':
        return 'Vazia';
      case 'middle':
        return 'Metade';
      default:
        return 'Desconhecido';
    }
  }

  @override
  Widget build(BuildContext context) {
    if (loadingPrefs) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (serverIp == null || serverPort == null) {
      return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.deepPurple,
          title: const Text(
            "Lixeira Automática",
            style: TextStyle(color: Colors.white, fontSize: 24),
          ),
        ),
        body: const Center(
          child: Text(
            "Configuração do servidor não encontrada.\nPor favor, configure IP e porta.",
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 18, color: Colors.red),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.deepPurple,
        title: const Text(
          "Lixeira Automática",
          style: TextStyle(color: Colors.white, fontSize: 24),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Colors.white),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => const LoginScreen(),
                ),
              );
            },
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : GridView.builder(
        padding: const EdgeInsets.all(16.0),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16.0,
          mainAxisSpacing: 16.0,
          childAspectRatio: 0.75,
        ),
        itemCount: trashData.length,
        itemBuilder: (context, index) {
          var trashItem = trashData[index];

          String imagePath;
          switch (trashItem.status.toLowerCase()) {
            case 'full':
              imagePath = 'assets/images/trash_full.gif';
              break;
            case 'middle':
              imagePath = 'assets/images/trash_middle.gif';
              break;
            default:
              imagePath = 'assets/images/trash_empty.gif';
          }

          return Card(
            color: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            elevation: 4,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: const BoxDecoration(
                    color: Colors.deepPurple,
                    borderRadius:
                    BorderRadius.vertical(top: Radius.circular(12)),
                  ),
                  child: Text(
                    trashItem.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          trashItem.location,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.black87,
                          ),
                          textAlign: TextAlign.center,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        Image.asset(
                          imagePath,
                          width: 80,
                          height: 80,
                          fit: BoxFit.contain,
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: _getStatusColor(trashItem.status),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            _formatStatusLabel(trashItem.status),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
